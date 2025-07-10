import {
  actualizarPublicidad,
  agregarPublicidad,
  eliminarPublicidad
} from "@/actions";
import { PublicidadForm } from "@/types/publicidad";

export const usePublicidad = () => {
  const agregarNuevaPublicidad = async (data: PublicidadForm) => {
    try {
      const respuesta = await agregarPublicidad(data);
      return respuesta;
    } catch (err) {
      console.error("Error al agregar publicidad:", err);
      throw err;
    }
  };

  const actualizarPublicidadExistente = async (data: PublicidadForm) => {
    try {
      const respuesta = await actualizarPublicidad(data.id!, data);
      return respuesta;
    } catch (err) {
      console.error("Error al actualizar publicidad:", err);
      throw err;
    }
  };

  const eliminarPublicidadPorId = async (id: number) => {
    try {
      await eliminarPublicidad(id);
      return true;
    } catch (err) {
      console.error("Error al eliminar publicidad:", err);
      throw err;
    }
  };

  return {
    agregarNuevaPublicidad,
    actualizarPublicidadExistente,
    eliminarPublicidadPorId
  };
};
