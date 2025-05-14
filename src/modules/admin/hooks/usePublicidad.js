import { useState, useEffect, useCallback } from "react";
import { 
  eliminarPublicidad, 
  agregarPublicidad, 
  actualizarPublicidad 
} from "../services";

import { obtenerPublicidad } from "../../config";

export const usePublicidad = () => {
  const [publicidades, setPublicidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicidad = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await obtenerPublicidad();
      const formateadas = data.map((item) => ({
        id: item.id,
        imagen: item.imagen,
        nombre_anunciante: item.nombre_anunciante,
        fecha_expiracion: item.fecha_expiracion,
      }));
      
      setPublicidades(formateadas);
    } catch (err) {
      setError("Error al obtener publicidades");
      console.error("Error al obtener publicidad:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const agregarNuevaPublicidad = async (data) => {
    try {
      const respuesta = await agregarPublicidad(data);
      await fetchPublicidad();
      return respuesta;
    } catch (err) {
      setError("Error al agregar publicidad");
      console.error("Error al agregar publicidad:", err);
      throw err;
    }
  };

  const actualizarPublicidadExistente = async (id, data) => {
    try {
      const respuesta = await actualizarPublicidad(id, data);
      await fetchPublicidad();
      return respuesta;
    } catch (err) {
      setError("Error al actualizar publicidad");
      console.error("Error al actualizar publicidad:", err);
      throw err;
    }
  };

  const eliminarPublicidadPorId = async (id) => {
    try {
      await eliminarPublicidad(id);
      setPublicidades(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError("Error al eliminar publicidad");
      console.error("Error al eliminar publicidad:", err);
      throw err;
    }
  };

  useEffect(() => {
    // No llamamos fetchPublicidad aquí para evitar que se cargue automáticamente
    // y dar control al componente sobre cuándo hacer la primera carga
  }, []);

  return {
    publicidades,
    loading,
    error,
    fetchPublicidad,
    agregarNuevaPublicidad,
    actualizarPublicidadExistente,
    eliminarPublicidadPorId
  };
};