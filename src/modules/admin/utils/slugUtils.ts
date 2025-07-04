import { Noticia, Slide } from "@/types/news";

export const generarSlug = (titulo: string) => {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const extraerIdDeSlug = (slug: string) => {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1]) : null;
};

export const crearSlugConId = (titulo: string, id: number) => {
  const baseSlug = generarSlug(titulo);
  return `${baseSlug}-${id}`;
};

export const formatearNoticiasConSlugs = (noticias: Noticia[]) => {
  return noticias.map((noticia) => ({
    ...noticia,
    slug: crearSlugConId(noticia.titulo, noticia.id)
  }));
};

export const obtenerRutaSlug = (item: Slide) => {
  const slug =
    item.slug || crearSlugConId(item.title || item.description, item.id);
  return `/news/${slug}`;
};
