import axios from "axios";
import { API_BASE } from "./apiConfig";

export const obtenerNoticias = () => {
  return axios.get(`${API_BASE}/noticias/obtener-noticias`);
};

export const obtenerDetalleNoticia = (id) => {
  return axios.get(`${API_BASE}/noticias/obtener-detalle-noticia/${id}`);
};
