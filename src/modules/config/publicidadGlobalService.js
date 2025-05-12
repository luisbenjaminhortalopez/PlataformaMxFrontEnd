import axios from "axios";
import { API_BASE } from "./apiConfig";

export const obtenerPublicidad = () => {
  return axios.get(`${API_BASE}/publicidad/obtener-publicidad`);
};