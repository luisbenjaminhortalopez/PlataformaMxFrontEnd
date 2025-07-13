import { API_BASE } from "@/constants/api";
import { Categoria } from "@/types/news";
import axios from "axios";

export const obtenerCategorias = async () => {
  return await axios.get<Categoria[]>(
    `${API_BASE}/noticias/obtener-categorias`
  );
};

export const fetchCategorias = async () => {
  try {
    const { data } = await obtenerCategorias();
    const categoriasMap: Record<number, string> = {};
    data.forEach((cat) => {
      categoriasMap[cat.id] = cat.categoria;
    });
    return categoriasMap;
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    return {};
  }
};
