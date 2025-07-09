import { FormattedNews, Noticia } from "@/types/news";

export const formatearListadoNoticias = (data: Noticia[]) => {
  return data.map((noticia) => ({
    id: noticia.id,
    title: noticia.titulo,
    image: noticia.imagen_portada,
    fechaPublicacion: noticia.fecha_publicacion,
    fechaVencimiento: noticia.fecha_vencimiento
  }));
};

export const ordenarNoticiasPorFecha = (noticias: FormattedNews[]) => {
  return [...noticias].sort(
    (a, b) =>
      new Date(b.fechaPublicacion).getTime() -
      new Date(a.fechaPublicacion).getTime()
  );
};

export const truncarTexto = (texto: string, maxLength = 100) => {
  if (!texto || texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength) + "...";
};
