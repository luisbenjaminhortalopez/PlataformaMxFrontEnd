export interface Publicidad {
  id: number;
  imagen: string;
  nombre_anunciante: string;
  fecha_expiracion: string;
}

export interface PublicidadForm {
  id: number | null;
  file: File | null;
  nombre_anunciante: string;
  fecha_expiracion: string;
  imagen_url?: string;
}
