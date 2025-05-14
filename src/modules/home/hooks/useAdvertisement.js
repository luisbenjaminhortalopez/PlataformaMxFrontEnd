import { useState, useEffect } from 'react';
import { obtenerPublicidad } from '../../config';

export const useAdvertisement = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await obtenerPublicidad();
        const adverts = Array.isArray(response) ? response : response.data;
        
        if (!Array.isArray(adverts)) {
          throw new Error("La respuesta de publicidad no es válida.");
        }
        
        const now = new Date();
        const validAdverts = adverts.filter(ad => new Date(ad.fecha_expiracion) > now);
        
        if (validAdverts.length > 0) {
          const randomAd = validAdverts[Math.floor(Math.random() * validAdverts.length)];
          setBanner(randomAd.imagen);
        } else {
          setBanner(null);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar la publicidad');
        console.error("Error loading advertisement:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisement();
  }, []);

  return { banner, loading, error };
};