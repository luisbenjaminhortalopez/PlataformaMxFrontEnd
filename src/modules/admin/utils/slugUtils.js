export const generarSlug = (titulo) => {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const extraerIdDeSlug = (slug) => {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1]) : null;
};

export const crearSlugConId = (titulo, id) => {
  const baseSlug = generarSlug(titulo);
  return `${baseSlug}-${id}`;
};

export const formatearNoticiasConSlugs = (noticias) => {
  return noticias.map(noticia => ({
    ...noticia,
    slug: crearSlugConId(noticia.titulo, noticia.id)
  }));
};
