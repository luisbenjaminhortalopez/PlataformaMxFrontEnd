"use server";

import { API_BASE } from "@/constants/api";
import { Categoria, DetalleNoticia, NewsData, Noticia } from "@/types/news";
import { crearSlugConId } from "@/modules/admin/utils/slugUtils";
import axios from "axios";

export const obtenerNoticias = async () => {
  return await axios.get<Noticia[]>(`${API_BASE}/noticias/obtener-noticias`);
};

export const obtenerDetalleNoticia = async (id: number) => {
  return await axios.get<DetalleNoticia>(
    `${API_BASE}/noticias/obtener-detalle-noticia/${id}`
  );
};

export const obtenerCategorias = async () => {
  return await axios.get<Categoria[]>(
    `${API_BASE}/noticias/obtener-categorias`
  );
};

export const fetchNews = async (): Promise<NewsData | undefined> => {
  try {
    // setError(null);

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
    // setError(err.message || "Error al cargar noticias");
    console.error("Error loading news:", err);
  }
};
