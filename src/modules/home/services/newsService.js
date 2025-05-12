import api from '../../../Services/api'; // Asegúrate de tener configurado axios correctamente

export const getNews = async () => {
  try {
    const response = await api.get('/noticias/obtener-noticias');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    throw error;
  }
};

export const getNewsDetail = async (id) => {
  try {
    const response = await api.get(`/noticias/obtener-detalle-noticia/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news detail:', error.response?.data || error.message);
    throw error;
  }
};