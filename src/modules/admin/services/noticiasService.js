import axios from "axios";
import { API_BASE } from "../../config";

export const obtenerNoticias = () => {
  return axios.get(`${API_BASE}/noticias/obtener-noticias`);
};

export const obtenerDetalleNoticia = (id) => {
  return axios.get(`${API_BASE}/noticias/obtener-detalle-noticia/${id}`);
};

export const agregarNoticia = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key]) formData.append(key, data[key]);
  }

  return axios.post(`${API_BASE}/noticias/agregar-noticia`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const actualizarNoticia = (id, data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  return axios.put(`${API_BASE}/noticias/actualizar-noticia/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const eliminarNoticia = (id) => {
  return axios.delete(`${API_BASE}/noticias/eliminar-noticia/${id}`);
};
