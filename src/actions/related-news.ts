import { crearSlugConId } from "@/modules/admin/utils/slugUtils";
import { obtenerNoticias } from "./news";
import { Slide } from "@/types/news";

export const loadRelatedNews = async (id: number | null) => {
  if (!id) return;

  try {
    const response = await obtenerNoticias();
    const allNews = response.data;

    if (Array.isArray(allNews)) {
      const filteredNews = allNews
        .filter((news) => news.id !== id)
        .map((news) => ({
          id: news.id,
          title: news.titulo,
          image: news.imagen_portada,
          slug: crearSlugConId(news.titulo, news.id)
        }));

      return filteredNews as Slide[];
    } else {
      return undefined;
    }
  } catch (err) {
    console.error("Error loading related news:", err);
    return undefined;
  }
};
