import {
  eliminarNoticia,
  obtenerDetalleNoticia
} from "@/actions";
import { crearSlugConId, formatearFecha } from "../utils";
import { NewsForm } from "@/types/news";

export const useNoticias = () => {
  const obtenerDetalleCompleto = async (
    id: number
  ): Promise<NewsForm & { slug: string }> => {
    const { data } = await obtenerDetalleNoticia(id);
    const detalle = data[0];

    return {
      id: detalle.id,
      titulo: detalle.titulo,
      autor: detalle.autor,
      fecha_publicacion: formatearFecha(detalle.fecha_publicacion),
      fecha_vencimiento: formatearFecha(detalle.fecha_vencimiento || ""),
      imagen_portada: detalle.imagen_portada,
      imagen_portada_url: detalle.imagen_portada,
      categoria_id: detalle.categoria_id.toString(),
      seccion01: detalle.seccion01,
      imagen01: detalle.imagen01,
      imagen01_url: detalle.imagen01,
      seccion02: detalle.seccion02 || "",
      imagen02: detalle.imagen02,
      imagen02_url: detalle.imagen02,
      slug: crearSlugConId(detalle.titulo, detalle.id)
    };
  };

  const eliminarNoticiaById = async (id: number) => {
    await eliminarNoticia(id);
  };

  return {
    obtenerDetalleCompleto,
    eliminarNoticiaById
  };
};
