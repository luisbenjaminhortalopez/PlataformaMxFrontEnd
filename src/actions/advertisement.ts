"use server";

import { API_BASE } from "@/constants/api";
import { Publicidad, PublicidadForm } from "@/types/publicidad";
import axios from "axios";

export const obtenerPublicidad = async () => {
  return await axios.get<Publicidad[]>(
    `${API_BASE}/publicidad/obtener-publicidad`
  );
};

export const fetchAdvertisement = async (): Promise<string | undefined> => {
  try {
    const response = await obtenerPublicidad();
    const adverts = response.data;

    if (!Array.isArray(adverts)) {
      throw new Error("La respuesta de publicidad no es un array.");
    }

    const now = new Date();
    const validAdverts = adverts.filter(
      (ad) => new Date(ad.fecha_expiracion) > now
    );

    if (validAdverts.length > 0) {
      const randomAd =
        validAdverts[Math.floor(Math.random() * validAdverts.length)];
      return randomAd.imagen;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error al cargar la publicidad:", error);
    return undefined;
  }
};

export const agregarPublicidad = (data: PublicidadForm) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });

  return axios.post(`${API_BASE}/publicidad/agregar-publicidad`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const actualizarPublicidad = (id: number, data: PublicidadForm) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return axios.put(
    `${API_BASE}/publicidad/actualizar-publicidad/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
};

export const eliminarPublicidad = (id: number) => {
  return axios.delete(`${API_BASE}/publicidad/eliminar-publicidad/${id}`);
};
