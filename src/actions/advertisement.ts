"use server";

import { API_BASE } from "@/constants/api";
import axios from "axios";

export const obtenerPublicidad = async () => {
  return await axios.get(`${API_BASE}/publicidad/obtener-publicidad`);
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
