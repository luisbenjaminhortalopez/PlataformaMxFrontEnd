export interface Noticia {
  id: number;
  imagen_portada: string;
  titulo: string;
  fecha_publicacion: string;
  fecha_vencimiento: string | null;
}

export interface DetalleNoticia {
  id: number;
  titulo: string;
  autor: string;
  fecha_publicacion: string;
  fecha_vencimiento: string | null;
  categoria_id: number;
  imagen_portada: string;
  seccion01: string;
  seccion02: string;
  imagen01: string;
  imagen02: string;
}

export interface Categoria {
  id: number;
  categoria: string;
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  slug: string;
  description: string;
}

export interface NewsData {
  slide: Slide[];
  secondNews: Slide[];
  more: Slide[];
}
