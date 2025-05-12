import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../../../assets/Logo.svg';
import { obtenerNoticias } from "../../config";


export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [leftColumnNews, setLeftColumnNews] = useState([]);
  const [rightColumnNews, setRightColumnNews] = useState([]);
  const [moreNews, setMoreNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        setLoading(true);
        const { data } = await obtenerNoticias();

        const noticias = data.map((n) => ({
          id: n.id,
          image: n.imagen_portada,
          description: n.titulo,
        }));

        setLeftColumnNews(noticias.slice(0, 2));
        setRightColumnNews(noticias.slice(2, 4));
        setMoreNews(noticias.slice(4));
      } catch (err) {
        setError("No se pudieron cargar las noticias.");
        console.error("Error al obtener noticias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  const slides = [
    {
      id: 0,
      image: "https://diarioelregionaldelzulia.com/wp-content/uploads/2025/03/Premios-Oscar-2025.jpg",
      title: "Oscar 2025: Conoce a todos los ganadores de la 97 entrega de los premios de la academia.",
    },
    {
      id: 0,
      image: "https://media.vogue.mx/photos/6293a11fb1d349287c594c29/2:3/w_2560%2Cc_limit/checo-perez-formula-1-gran-premio-de-monaco.jpg",
      title: "'Checo' Pérez defenderá Fórmula 1 para ser campeón del mundo.",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <header className="bg-black py-7 text-center mb-8">
        <img src={logo} alt="Logo PlataformaMX" className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] mx-auto" />
      </header>

      <main className="w-full px-5 custom:px-10 space-y-10">
        {/* Banner */}
        <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-500 rounded-3xl py-32 custom:py-52 px-6 flex flex-col items-center custom:flex-row gap-6 relative overflow-hidden mb-19">
          <div className="flex-1 min-w-[180px]"></div>
          <div className="flex gap-6 justify-center custom:justify-end flex-1 min-w-[180px] relative"></div>
        </section>

        {/* Sección de Noticias */}
        <section className="grid grid-cols-1 custom:grid-cols-3fr gap-8 custom:gap-15 mobile-order">
          {/* Izquierda */}
          <div className="space-y-8 custom:space-y-15 left-column">
            {leftColumnNews.map((news) => (
              <article key={news.id} className="bg-black rounded-3xl overflow-hidden relative w-[350px] custom:w-[340px] mx-auto">
                <div className="w-full h-80 custom:h-80 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news.id)}>
                  <img src={news.image} alt={news.description} className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-white text-xl custom:text-2xl p-4 custom:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                  {news.description}
                </p>
              </article>
            ))}
          </div>

          {/* Carrusel central */}
          <article className="bg-black rounded-3xl overflow-hidden relative h-[500px] custom:h-[600px] lg:h-[700px] carousel">
            <div className="w-full h-full overflow-hidden cursor-pointer" onClick={() => handleNewsClick(slides[currentSlide].id)}>
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-11 left-0 right-16 px-6 z-10">
              <p className="text-white text-xl custom:text-2xl font-bold drop-shadow-2xl leading-tight">
                {slides[currentSlide].title}
              </p>
            </div>
            <div className="absolute bottom-4 right-3 flex space-x-3 z-20">
              <button onClick={prevSlide} className="bg-white/1 hover:bg-white/15 backdrop-blur-md rounded-lg w-12 h-12 flex items-center justify-center transition-all border border-white/20 hover:border-white/40">
                <span className="text-white text-2xl font-bold">&lt;</span>
              </button>
              <button onClick={nextSlide} className="bg-white/1 hover:bg-white/15 backdrop-blur-md rounded-lg w-12 h-12 flex items-center justify-center transition-all border border-white/20 hover:border-white/40">
                <span className="text-white text-2xl font-bold">&gt;</span>
              </button>
            </div>
          </article>

          {/* Derecha */}
          <div className="space-y-8 custom:space-y-15 right-column">
            {rightColumnNews.map((news) => (
              <article key={news.id} className="bg-black rounded-3xl overflow-hidden relative w-[350px] custom:w-[340px] mx-auto">
                <div className="w-full h-80 custom:h-80 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news.id)}>
                  <img src={news.image} alt={news.description} className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-white text-xl custom:text-2xl p-4 custom:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                  {news.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Más noticias horizontal */}
        <section className="mt-12 lg:mt-19 mb-16 lg:mb-30 px-4 sm:px-0">
          <h2 className="text-black text-3xl sm:text-4xl lg:text-6xl font-semibold mb-6 lg:mb-9 select-none px-2 sm:px-0">
            Más Noticias
          </h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-6 lg:pb-9 space-x-4 sm:space-x-6 lg:space-x-14 px-2 sm:px-0 scrollbar scrollbar-thumb-amber-500 scrollbar-track-gray-100 scrollbar-h-2">
              {moreNews.map((news) => (
                <article key={news.id} className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-96 bg-black rounded-3xl overflow-hidden relative h-[300px] sm:h-[350px] lg:h-[28rem] mx-8">
                  <div className="w-full h-80 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news.id)}>
                    <img
                      src={news.image}
                      alt={news.description}
                      className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x500?text=Imagen+no+disponible';
                      }}
                    />
                  </div>
                  <p className="text-white text-lg sm:text-xl lg:text-2xl p-4 lg:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                    {news.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};