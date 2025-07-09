"use server";

import { API_BASE } from "@/constants/api";
import { crearSlugConId } from "@admin/utils";
import { NewsData, NewsForm, Noticia } from "@/types/news";
import axios from "axios";

export const obtenerNoticias = async () => {
  return await axios.get<Noticia[]>(`${API_BASE}/noticias/obtener-noticias`);
};

export const fetchNews = async (): Promise<NewsData | undefined> => {
  try {
    const response = await obtenerNoticias();
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("La respuesta de noticias no es un array.");
    }

    const sortedNews = [...data].sort(
      (a, b) =>
        new Date(b.fecha_publicacion).getTime() -
        new Date(a.fecha_publicacion).getTime()
    );

    const now = new Date();
    const validNews = sortedNews.filter(
      (news) =>
        news.fecha_vencimiento === null ||
        new Date(news.fecha_vencimiento).getTime() > now.getTime()
    );

    if (validNews.length === 0) {
      return {
        slide: [],
        secondNews: [],
        more: []
      };
    }

    const principalNews = validNews.slice(0, Math.min(5, validNews.length));

    const siguientes =
      validNews.length > 5
        ? validNews.slice(5, Math.min(9, validNews.length))
        : [];

    const restantes = validNews.length > 9 ? validNews.slice(9) : [];

    return {
      slide: principalNews.map((n) => ({
        id: n.id,
        image: n.imagen_portada,
        title: n.titulo,
        description: n.titulo,
        slug: crearSlugConId(n.titulo, n.id)
      })),
      secondNews: siguientes.map((n) => ({
        id: n.id,
        image: n.imagen_portada,
        title: n.titulo,
        description: n.titulo,
        slug: crearSlugConId(n.titulo, n.id)
      })),
      more: restantes.map((n) => ({
        id: n.id,
        image: n.imagen_portada,
        title: n.titulo,
        description: n.titulo,
        slug: crearSlugConId(n.titulo, n.id)
      }))
    };
  } catch (err) {
    console.error("Error loading news:", err);
    return undefined;
  }
};

export const agregarNoticias = async (data: NewsForm) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return axios.post(`${API_BASE}/noticias/agregar-noticia`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const actualizarNoticia = (id: number, data: NewsForm) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return axios.put(`${API_BASE}/noticias/actualizar-noticia/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const eliminarNoticia = (id: number) => {
  return axios.delete(`${API_BASE}/noticias/eliminar-noticia/${id}`);
};
