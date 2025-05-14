import { useState, useEffect } from 'react';
import { obtenerNoticias } from '../../config';

export const useNewsData = () => {
  const [newsData, setNewsData] = useState({
    slide: null,
    secondNews: [],
    more: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await obtenerNoticias();
        const data = Array.isArray(response) ? response : response.data;

        if (!Array.isArray(data)) {
          throw new Error("La respuesta de noticias no es un array.");
        }

        const sortedNews = [...data].sort(
          (a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
        );

        const now = new Date();
        const validNews = sortedNews.filter(
          news => new Date(news.fecha_vencimiento) > now
        );

        if (validNews.length === 0) {
          setNewsData({
            slide: null,
            secondNews: [],
            more: []
          });
          return;
        }

        const principal = validNews[0];
        const siguientes = validNews.length > 1 ? validNews.slice(1, Math.min(5, validNews.length)) : [];
        const restantes = validNews.length > 5 ? validNews.slice(5) : [];

        setNewsData({
          slide: {
            id: principal.id,
            image: principal.imagen_portada,
            title: principal.titulo,
          },
          secondNews: siguientes.map((n) => ({
            id: n.id,
            image: n.imagen_portada,
            description: n.titulo,
          })),
          more: restantes.map((n) => ({
            id: n.id,
            image: n.imagen_portada,
            description: n.titulo,
          })),
        });
      } catch (err) {
        setError(err.message || 'Error al cargar noticias');
        console.error("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { newsData, loading, error };
};