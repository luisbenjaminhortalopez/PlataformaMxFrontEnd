import { API_BASE } from "@/constants/api";
import { DetalleNoticia, NewsDetailMapped } from "@/types/news";
import axios from "axios";
import { fetchCategorias } from "./categories";

export const obtenerDetalleNoticia = async (id: number) => {
  return await axios.get<DetalleNoticia>(
    `${API_BASE}/noticias/obtener-detalle-noticia/${id}`
  );
};

export const fetchNewsDetail = async (id: number | null) => {
  if (!id) return;

  try {
    const { data } = await obtenerDetalleNoticia(id);

    const arrayData = Array.isArray(data) ? data : [];

    if (arrayData.length === 0) {
      throw new Error("Noticia no encontrada.");
    }

    const n = arrayData[0];

    const categorias = await fetchCategorias();

    const formattedNews = {
      id: n.id,
      title: n.titulo,
      author: n.autor,
      date: new Date(n.fecha_publicacion).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      categoryId: n.categoria_id,
      category: categorias[n.categoria_id] || `Categoría ${n.categoria_id}`,
      images: [n.imagen_portada, n.imagen01].filter(Boolean),
      content: [n.seccion01].filter(Boolean)
    };

    if (n.imagen02) formattedNews.images.push(n.imagen02);
    if (n.seccion02) formattedNews.content.push(n.seccion02);

    return formattedNews as NewsDetailMapped;
  } catch (err) {
    console.error("Error loading news detail:", err);
    return undefined;
  }
};
