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

export interface NewsDetailMapped {
  id: number;
  title: string;
  author: string;
  date: string;
  categoryId: number;
  category: string;
  images: string[];
  content: string[];
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

export interface NewsForm {
  id: number | null;
  titulo: string;
  autor: string;
  fecha_publicacion: string;
  fecha_vencimiento: string | null;
  imagen_portada: string | null;
  categoria_id: string;
  seccion01: string;
  imagen01: string | null;
  seccion02: string;
  imagen02: string | null;
  imagen_portada_url?: string;
  imagen01_url?: string;
  imagen02_url?: string;
}

export interface FormattedNews {
  id: number;
  title: string;
  image: string;
  fechaPublicacion: string;
  fechaVencimiento: string | null;
}
