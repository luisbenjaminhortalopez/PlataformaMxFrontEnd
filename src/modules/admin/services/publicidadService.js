import axios from "axios";
import { API_BASE } from "../../config";

export const obtenerPublicidad = () => {
  return axios.get(`${API_BASE}/publicidad/obtener-publicidad`);
};

export const agregarPublicidad = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key]) formData.append(key, data[key]);
  }

  return axios.post(`${API_BASE}/publicidad/agregar-publicidad`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const actualizarPublicidad = (id, data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  return axios.put(`${API_BASE}/publicidad/actualizar-publicidad/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const eliminarPublicidad = (id) => {
  return axios.delete(`${API_BASE}/publicidad/eliminar-publicidad/${id}`);
};
