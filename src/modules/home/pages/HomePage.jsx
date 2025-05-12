import { useState, useEffect } from 'react';
import { useNavigate } from "react-router"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../../../assets/Logo.svg';
import { getNews } from '../../../Services/newsService.js'; 

export const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate(); 
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchNewsData = async () => {
        try {
          setLoading(true);
          const data = await getNews(); // Usa el servicio Axios
          setNewsData(data);
        } catch (err) {
          setError(err.message);
          console.error("Error loading news:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchNewsData();
    }, []);

     const handleNewsClick = (id) => {
        navigate(`/news/${id}`);
    };

    const slides = [
      {
        id:0,
        image: "https://diarioelregionaldelzulia.com/wp-content/uploads/2025/03/Premios-Oscar-2025.jpg",
        title: "Oscar 2025: Conoce a todos los ganadores de la 97 entrega de los premios de la academia.",
      },
      {
        id:0,
        image: "https://media.vogue.mx/photos/6293a11fb1d349287c594c29/2:3/w_2560%2Cc_limit/checo-perez-formula-1-gran-premio-de-monaco.jpg",
        title: "'Checo' Pérez defenderá Fórmula 1 para ser campeón del mundo.",
      },
    ];
  
    const leftColumnNews = [
      {
        id: 1,
        image: "https://tse1.mm.bing.net/th/id/OIP.BTqL8vzFF9wooxevlI-gNQHaFS?w=1225&h=875&rs=1&pid=ImgDetMain",
        description: "Sheinbaum: México colaborará para que el tratado no llegue a EE.UU. y que haya diálogo."
      },
      {
        id: 2,
        image: "https://tse1.mm.bing.net/th/id/OIP.WzCwD2ZwTkjxBR84Of5CCgHaE8?rs=1&pid=ImgDetMain",
        description: "8 de Marzo: Así se vivió la marcha en conmemoración por día de la mujer en México."
      }
    ];

    const rightColumnNews = [
      {
        id: 3,
        image: "https://imgcdn.stablediffusionweb.com/2024/9/17/fd5433cf-9e1e-4037-bc73-1dc475aceed7.jpg",
        description: "Tesla en caida libre: ¿Está Elon Musk hundiendo sus acciones?"
      },
      {
        id: 4,
        image: "https://media.vogue.mx/photos/6293a11fb1d349287c594c29/2:3/w_2560%2Cc_limit/checo-perez-formula-1-gran-premio-de-monaco.jpg",
        description: "'Checo' Pérez defenderá Fórmula 1 para ser campeón del mundo."
      }
    ];

    const moreNews = [
      {
        id: 5,
        image: "https://www.billboard.com/wp-content/uploads/2022/09/shakira-2022-NBCUniversal-Upfront-billboard-1548.jpg",
        description: "Shakira: La reina del pop latino que conquistó el mundo"
      },
      {
        id: 6,
        image: "https://tse1.mm.bing.net/th/id/OIP.0BWCnITp8qw5J1sHC-2rXAHaE7?rs=1&pid=ImgDetMain",
        description: "Saturday Night como un grupo comediantes conquistó la televisión"
      },
      {
        id: 7,
        image: "https://tse1.mm.bing.net/th/id/OIP.oXGH0O8S9f_IujiltCSf9AHaEK?rs=1&pid=ImgDetMain",
        description: "¿Sorpresa? Ted Lasso regresa para una cuarta temporada"
      },
      {
        id: 8,
        image: "https://tse1.mm.bing.net/th/id/OIP.WzCwD2ZwTkjxBR84Of5CCgHaE8?rs=1&pid=ImgDetMain",
        description: "8 de Marzo: Así se vivió la marcha en conmemoración por día de la mujer en México."
      },
      {
        id: 9,
        image: "https://media.vogue.mx/photos/6293a11fb1d349287c594c29/2:3/w_2560%2Cc_limit/checo-perez-formula-1-gran-premio-de-monaco.jpg",
        description: "'Checo' Pérez defenderá Fórmula 1 para ser campeón del mundo."
      },
      {
        id: 10,
        image: "https://imgcdn.stablediffusionweb.com/2024/9/17/fd5433cf-9e1e-4037-bc73-1dc475aceed7.jpg",
        description: "Tesla en caida libre: ¿Está Elon Musk hundiendo sus acciones?"
      }
    ];

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return(  
        <>
          {/* Estilos para el breakpoint personalizado (910px) */}
          <style>{`
            @media (min-width: 910px) {
              .custom\\:text-5xl { font-size: 3rem; line-height: 1; }
              .custom\\:px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
              .custom\\:py-52 { padding-top: 13rem; padding-bottom: 13rem; }
              .custom\\:grid-cols-3fr { grid-template-columns: 1fr 1.3fr 1fr; }
              .custom\\:gap-15 { gap: 3.75rem; }
              .custom\\:space-y-15 > * + * { margin-top: 3.75rem; }
              .custom\\:h-80 { height: 20rem; }
              .custom\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
              .custom\\:p-5 { padding: 1.25rem; }
              .custom\\:h-600px { height: 600px; }
              .custom\\:h-700px { height: 700px; }
              .custom\\:h-40 { height: 10rem; }
              .custom\\:bottom-11 { bottom: 2.75rem; }
              .custom\\:right-16 { right: 4rem; }
              .custom\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
              .custom\\:w-12 { width: 3rem; }
              .custom\\:h-12 { height: 3rem; }
              .custom\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
              .custom\\:bottom-6 { bottom: 1.5rem; }
              .custom\\:left-30 { left: 7.5rem; }
              .custom\\:w-3 { width: 0.75rem; }
              .custom\\:h-3 { height: 0.75rem; }
              .custom\\:mt-19 { margin-top: 4.75rem; }
              .custom\\:mb-30 { margin-bottom: 7.5rem; }
              .custom\\:text-6xl { font-size: 3.75rem; line-height: 1; }
              .custom\\:mb-9 { margin-bottom: 2.25rem; }
              .custom\\:pb-9 { padding-bottom: 2.25rem; }
              .custom\\:w-80 { width: 20rem; }
              .custom\\:py-40 { padding-top: 10rem; padding-bottom: 10rem; }
              .custom\\:text-8xl { font-size: 6rem; line-height: 1; }
              .custom\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
              .custom\\:text-7xl { font-size: 4.5rem; line-height: 1; }
            }

            /* Nuevos estilos para el orden en móvil */
            @media (max-width: 909px) {
              .mobile-order {
                display: flex;
                flex-direction: column;
              }
              .mobile-order > .carousel {
                order: 1;
              }
              .mobile-order > .left-column {
                order: 2;
              }
              .mobile-order > .right-column {
                order: 3;
              }
            }
          `}</style>

          <header className="bg-black py-7 text-center mb-8">
            <img src={logo} className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto" alt="Logo PlataformaMX" />
          </header>

          {/* Main content container */}
          <main className="w-full px-5 custom:px-10 space-y-10">
            {/* Banner Section */}
            <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-500 rounded-3xl py-32 custom:py-52 px-6 flex flex-col items-center custom:flex-row gap-6 relative overflow-hidden mb-19">
              <div className="flex-1 min-w-[180px]"></div>
              <div className="flex gap-6 justify-center custom:justify-end flex-1 min-w-[180px] relative"></div>
            </section>

            
          {/* News grid top - Modificado para imágenes */}
          <section className="grid grid-cols-1 custom:grid-cols-3fr gap-8 custom:gap-15 mobile-order">
              {/* Left column top */}
              <div className="space-y-8 custom:space-y-15 left-column">
                {leftColumnNews.map((news) => (
                  <article key={news.id} className="bg-black rounded-3xl overflow-hidden relative w-[350px] custom:w-[340px] mx-auto">
                    <div className="w-full h-80 custom:h-80 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news.id)}>
                      <img
                        className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                        src={news.image}
                        alt={news.description}
                      />
                    </div>
                    <p className="text-white text-xl custom:text-2xl p-4 custom:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                      {news.description}
                    </p>
                  </article>
                ))}
              </div>

              {/* Carrusel */}
              <article className="bg-black rounded-3xl overflow-hidden relative h-[500px] custom:h-[600px] lg:h-[700px] carousel">
                <div className="w-full h-full overflow-hidden cursor-pointer" onClick={() => handleNewsClick(slides[currentSlide].id)}>
                  <img
                    className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                  />
                </div>
                
                {/* Capa de gradiente */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                {/* Texto */}
                <div className="absolute bottom-11 left-0 right-16 px-6 z-10">
                  <p className="text-white text-xl custom:text-2xl font-bold drop-shadow-2xl leading-tight">
                    {slides[currentSlide].title}
                  </p>
                </div>
                
                {/* Controles de navegación */}
                <div className="absolute bottom-4 right-3 flex space-x-3 z-20">
                  <button 
                    onClick={prevSlide}
                    className="bg-white/1 hover:bg-white/15 backdrop-blur-md rounded-lg w-12 h-12 flex items-center justify-center transition-all group border border-white/20 hover:border-white/40"
                  >
                    <span className="text-white text-2xl font-bold transform group-hover:scale-110 transition-transform">
                      &lt;
                    </span>
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="bg-white/1 hover:bg-white/15 backdrop-blur-md rounded-lg w-12 h-12 flex items-center justify-center transition-all group border border-white/20 hover:border-white/40"
                  >
                    <span className="text-white text-2xl font-bold transform group-hover:scale-110 transition-transform">
                      &gt;
                    </span>
                  </button>
                </div>
                
                {/* Indicadores de slide */}
                <div className="absolute bottom-6 left-30 flex space-x-2 z-20">
                  {slides.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </article>

             {/* Right column top - Modificado para imágenes */}
             <div className="space-y-8 custom:space-y-15 right-column">
                {rightColumnNews.map((news) => (
                  <article key={news.id} className="bg-black rounded-3xl overflow-hidden relative w-[350px] custom:w-[340px] mx-auto">
                    <div className="w-full h-80 custom:h-80 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news.id)}>
                      <img
                        className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                        src={news.image}
                        alt={news.description}
                      />
                    </div>
                    <p className="text-white text-xl custom:text-2xl p-4 custom:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                      {news.description}
                    </p>
                  </article>
                ))}
              </div>
          </section>

          {/* Más Noticias Section - Versión Responsiva */}
            <section className="mt-12 lg:mt-19 mb-16 lg:mb-30 px-4 sm:px-0">
              <h2 className="text-black text-3xl sm:text-4xl lg:text-6xl font-semibold mb-6 lg:mb-9 select-none px-2 sm:px-0">
                Más Noticias
              </h2>
              
              <div className="relative">
                <div className="flex overflow-x-auto pb-6 lg:pb-9 space-x-4 sm:space-x-6 lg:space-x-14 px-2 sm:px-0 scrollbar scrollbar-thumb-amber-500 scrollbar-track-gray-100 scrollbar-h-2">
                  {moreNews.map((news) => (
                    <article 
                      key={news.id} 
                      className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-96 bg-black rounded-3xl overflow-hidden relative h-[300px] sm:h-[350px] lg:h-[28rem] mx-8"
                    >
                      <div className="w-full h-80 custom:h-80 overflow-hidden cursor-pointer" onClick={() => handleNewsClick(news.id)}>
                        <img
                          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                          src={news.image}
                          alt={news.description.substring(0, 20)}
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

          {/* Footer con elementos ligeramente más grandes */}
          <footer className="bg-black py-24 md:py-48 px-4 sm:px-10 mt-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
                
                {/* Logo - Tamaño aumentado */}
                <img
                  src={logo}
                  className="max-h-[70px] md:max-h-[100px] lg:max-h-[140px] w-auto select-none mx-auto md:mx-0"
                />
                
                {/* Redes sociales - Tamaño aumentado */}
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