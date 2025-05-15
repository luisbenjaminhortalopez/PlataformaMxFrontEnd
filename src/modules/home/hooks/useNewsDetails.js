import { useState, useEffect } from 'react';
import { obtenerDetalleNoticia } from '../../config';

const getCategoryName = (categoryId) => {
  const categoryMap = {
    1: "Noticias",
    2: "Espectaculos y entretenimiento",
    3: "Deportes",
    4: "Economía y negocios",
    5: "Ciencia y salud",
    6: "Trending",
    7: "Gadgets y tecnología",
    8: "Especiales",
    9: "Estilo de vida",
    10: "Agenda Plataforma News"
  };
  
  const numericId = Number(categoryId);
  if (isNaN(numericId)) {
    console.error(`ID de categoría inválido: ${categoryId}`);
    return "General";
  }
  
  return categoryMap[numericId] || `Categoría ${numericId}`;
};

export const useNewsDetails = (newsId) => {
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!newsId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await obtenerDetalleNoticia(newsId);
        
        const arrayData = Array.isArray(data) ? data : data?.data ?? [];
        
        if (!Array.isArray(arrayData) || arrayData.length === 0) {
          throw new Error("Noticia no encontrada.");
        }

        const n = arrayData[0];
        
        const formattedNews = {
          id: n.id,
          title: n.titulo,
          author: n.autor,
          date: new Date(n.fecha_publicacion).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          categoryId: n.categoria_id,
          category: getCategoryName(n.categoria_id),
          images: [n.imagen01].filter(Boolean),
          content: [n.seccion01].filter(Boolean),
        };

        if (n.imagen02) formattedNews.images.push(n.imagen02);
        if (n.seccion02) formattedNews.content.push(n.seccion02);

        setNewsDetail(formattedNews);
      } catch (err) {
        setError(err.message || 'Error al cargar el detalle de la noticia');
        console.error("Error loading news detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [newsId]);

  return { newsDetail, loading, error };
};