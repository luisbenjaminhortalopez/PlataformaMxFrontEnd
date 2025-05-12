import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/Logo.svg";
import { MainNew, SecondNew, MoreNewsCard } from "../components";
import { obtenerNoticias } from "../../config";

export const HomePage = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  useEffect(() => {
    const fetchNewsData = async () => {
  try {
    setLoading(true);

    const response = await obtenerNoticias();

    console.log("Respuesta completa de la API:", response);

    // Si la API devuelve un objeto con la propiedad `data`, ajústalo aquí
    const data = Array.isArray(response) ? response : response.data;

    if (!Array.isArray(data)) {
      throw new Error("La respuesta de noticias no es un array.");
    }

    const ordenadas = [...data].sort(
      (a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
    );

    const principal = ordenadas[0];
    const siguientes = ordenadas.slice(1, 5);
    const restantes = ordenadas.slice(5);

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
    setError(err.message);
    console.error("Error loading news:", err);
  } finally {
    setLoading(false);
  }
};

    fetchNewsData();
  }, []);

  return (
    <>
      <header className="bg-black py-7 text-center mb-8">
        <img
          src={logo}
          className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto"
          alt="Logo PlataformaMX"
        />
      </header>

      <main className="w-full px-5 lg:px-10 space-y-10">
        {/* Banner vacío si lo usas después */}
        <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-500 rounded-3xl py-32 px-6 flex flex-col items-center gap-10 relative overflow-hidden mb-12">
          <div className="flex-1 min-w-[180px]" />
          <div className="flex gap-6 justify-center flex-1 min-w-[180px] relative" />
        </section>

        {/* Noticias principales */}
        {newsData && (
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-8 lg:gap-14">
            <div className="space-y-8">
              {newsData.secondNews.slice(0, 2).map((news) => (
                <SecondNew
                  key={news.id}
                  image={news.image}
                  description={news.description}
                  onClick={() => handleNewsClick(news.id)}
                />
              ))}
            </div>

            <MainNew
              slides={[newsData.slide]}
              currentSlide={0}
              setCurrentSlide={() => {}}
              handleNewsClick={handleNewsClick}
              prevSlide={() => {}}
              nextSlide={() => {}}
            />

            <div className="space-y-8">
              {newsData.secondNews.slice(2).map((news) => (
                <SecondNew
                  key={news.id}
                  image={news.image}
                  description={news.description}
                  onClick={() => handleNewsClick(news.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Más Noticias */}
        {newsData && (
          <section className="mt-12 lg:mt-20 mb-16 lg:mb-28 px-4 sm:px-0">
            <h2 className="text-black text-3xl sm:text-4xl lg:text-6xl font-semibold mb-6 lg:mb-10 select-none">
              Más Noticias
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto pb-6 lg:pb-8 space-x-6 px-2 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-100">
                {newsData.more.map((news) => (
                  <MoreNewsCard
                    key={news.id}
                    image={news.image}
                    description={news.description}
                    onClick={() => handleNewsClick(news.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
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