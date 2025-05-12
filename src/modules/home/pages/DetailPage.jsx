import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../../../assets/Logo.svg';
import { obtenerDetalleNoticia, obtenerNoticias, obtenerPublicidad } from '../../config';

export const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [noticia, setNoticia] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      const data = await obtenerDetalleNoticia(id);

      const arrayData = Array.isArray(data) ? data : data?.data ?? [];
      if (!Array.isArray(arrayData) || arrayData.length === 0) {
        throw new Error("Noticia no encontrada.");
      }

      const n = arrayData[0];
      const formateada = {
        title: n.titulo,
        author: n.autor,
        date: new Date(n.fecha_publicacion).toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        category: `Categoría ${n.categoria_id}`,
        images: [n.imagen01].filter(Boolean),
        content: [n.seccion01].filter(Boolean),
      };

      if (n.imagen02) formateada.images.push(n.imagen02);
      if (n.seccion02) formateada.content.push(n.seccion02);

      setNoticia(formateada);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNoticiasRelacionadas = async () => {
    try {
      const response = await obtenerNoticias();
      const allNews = response.data;
      const filtradas = Array.isArray(allNews)
        ? allNews.filter((n) => n.id !== parseInt(id))
        : [];

      const mapeadas = filtradas.map((n) => ({
        id: n.id,
        title: n.titulo,
        image: n.imagen_portada,
      }));

      setRelatedArticles(mapeadas);
    } catch (err) {
      console.error("Error cargando noticias relacionadas:", err);
    }
  };

  const fetchPublicidad = async () => {
    try {
      const res = await obtenerPublicidad();
      const lista = res.data;
      const ahora = new Date();
      const vigentes = lista.filter(pub => new Date(pub.fecha_expiracion) > ahora);

      if (vigentes.length > 0) {
        const aleatoria = vigentes[Math.floor(Math.random() * vigentes.length)];
        setBanner(aleatoria.imagen);
      }
    } catch (err) {
      console.error("Error al obtener publicidad:", err);
    }
  };

  useEffect(() => {
    fetchNoticias();
    fetchNoticiasRelacionadas();
    fetchPublicidad();
  }, [id]);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
  };

  const handleRelatedArticleClick = (id) => {
    navigate(`/news/${id}`);
  };

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  if (!noticia) return <div className="text-center py-10">Noticia no encontrada</div>;

  return (
    <>
      <header className="bg-black py-7 text-center mb-8">
        <img src={logo} className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto" alt="Logo PlataformaMX" />
      </header>

      <main className="w-full px-5 md:px-20 space-y-10">
        {/* Banner dinámico */}
        {banner && (
          <section className="w-full flex justify-center items-center">
            <img 
              src={banner}
              alt="Publicidad"
              className="rounded-3xl w-full max-h-[400px] object-cover mb-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </section>
        )}

        {/* Título */}
        <section className="mb-4 md:mb-6 bg-gray-100 rounded-3xl p-6 md:p-11">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-6xl leading-snug md:leading-tight">
            {noticia.title}
          </h2>
        </section>

        {/* Artículo y relacionados */}
        <section className="mb-6 flex flex-col md:flex-row gap-10">
          {/* Contenido principal */}
          <article className="md:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-14 gap-4">
              <p className="text-xs md:text-2xl font-light">
                Por {noticia.author} | {noticia.date}
              </p>
              <p className="text-xl md:text-4xl font-bold">
                {noticia.category}
              </p>
            </div>

            <div className="w-full -mx-4 md:mx-0">
              {noticia.images.map((img, idx) => (
                <div key={idx}>
                  <img 
                    alt={`Imagen ${idx + 1}`} 
                    className="w-full h-auto min-h-[300px] md:min-h-[400px] object-cover rounded-none md:rounded-3xl mb-6 md:mb-10"
                    src={img}
                    onError={handleImageError}
                  />
                  <p className="text-lg md:text-2xl leading-relaxed md:leading-loose mb-6 md:mb-10">
                    {noticia.content[idx]}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Noticias relacionadas */}
          <aside className="md:w-1/3 my-24">
            <div className="bg-gray-200 rounded-xl p-3 mb-10 text-left inline-block text-3xl font-semibold text-gray-700">
              Leer Más:
            </div>

            {/* Versión desktop */}
            <div className="hidden md:block">
              {relatedArticles.map((article, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 mb-5 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => handleRelatedArticleClick(article.id)}
                >
                  <div className="w-50 h-40 rounded-md overflow-hidden relative">
                    <img 
                      alt={article.title} 
                      className="w-full h-full object-cover rounded-md hover:scale-110 transition-transform duration-300"
                      src={article.image} 
                      onError={handleImageError}
                    />
                  </div>
                  <p className="text-xs leading-tight">
                    {article.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Versión móvil */}
            <div className="md:hidden relative w-full -mx-5">
              <div className="flex overflow-x-auto pb-6 space-x-4 px-0 scrollbar scrollbar-thumb-amber-500">
                {relatedArticles.map((article, index) => (
                  <article 
                    key={`mobile-${index}`} 
                    className="flex-shrink-0 w-[280px] bg-black rounded-3xl overflow-hidden relative h-[300px]"
                    onClick={() => handleRelatedArticleClick(article.id)}
                  >
                    <img
                      className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                      src={article.image}
                      alt={article.title}
                      onError={handleImageError}
                    />
                    <p className="text-white text-lg p-4 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                      {article.title}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <footer className="bg-black py-24 md:py-48 px-4 sm:px-10 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
            <img
              src={logo}
              className="max-h-[70px] md:max-h-[100px] lg:max-h-[140px] w-auto select-none mx-auto md:mx-0"
              alt="Logo footer"
            />
            <div className="flex flex-col items-center md:items-end space-y-5 md:space-y-8">
              <p className="text-white text-lg md:text-2xl lg:text-4xl text-center md:text-right mb-5 md:mb-8">
                Síguenos en nuestras redes sociales:
              </p>
              <div className="flex space-x-7 md:space-x-10 text-3xl md:text-5xl lg:text-8xl">
                <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};