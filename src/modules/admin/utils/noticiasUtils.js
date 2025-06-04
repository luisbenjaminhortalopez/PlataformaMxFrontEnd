import { crearSlugConId } from './slugUtils';

export const formatearListadoNoticias = (data) => {
  return data.map((noticia) => ({
    id: noticia.id,
    title: noticia.titulo,
    image: noticia.imagen_portada,
    fechaPublicacion: noticia.fecha_publicacion,
    fechaVencimiento: noticia.fecha_vencimiento,
    slug: crearSlugConId(noticia.titulo, noticia.id)
  }));
};

export const ordenarNoticiasPorFecha = (noticias) => {
  return noticias.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
};