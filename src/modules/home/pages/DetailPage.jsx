import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../../../assets/Logo.svg';
import { obtenerDetalleNoticia } from '../../admin/services/noticiasService';
import { NewsCard } from '../../admin';
import api from '../../../Services/api';
import { getNewsDetail } from '../services/newsService'; 


export const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const fetchNoticias = async () => {
      try {
        setLoading(true);
        const data = await getNewsDetail(id); // Usa el servicio Axios
        setNoticia(response.data[0]); // Asumiendo que la respuesta es un array
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news detail:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchNoticias();
    }, [id]);
    
    const handleRelatedArticleClick = (id) => {
        navigate(`/news/${id}`);
      };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!noticia) return <div>Noticia no encontrada</div>;

   

  // Verificación de carga
  useEffect(() => {
    console.log('DetailPage mounted'); // Verifica en consola si el componente se monta
  }, []);

  const articleData = {
    title: "Oscar 2025: Conoce a todos los ganadores de la 97 entrega de los premios de la academia",
    author: "José Rangel",
    date: "19/Marzo/2025",
    category: "Premios",
    images: [
      "https://diarioelregionaldelzulia.com/wp-content/uploads/2025/03/Premios-Oscar-2025.jpg",
      "https://diarioelregionaldelzulia.com/wp-content/uploads/2025/03/Premios-Oscar-2025.jpg"
    ],
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta rhoncus sapien, nec semper massa efficitur ac. Pellentesque eu eleifend leo, nec luctus ligula. Ut sit amet interdum magna. Vivamus sed lacus vitae purus rutrum pharetra. Fusce congue pulvinar diam vitae porttitor. Nullam urna dui, faucibus ac aliquet vel, maximus et tellus. Curabitur laoreet nisl tortor, egestas bibendum ex ultricies at. Donec dictum risus ut diam malesuada, et pellentesque neque molestie. Sed nulla mi, bibendum sed dapibus non, efficitur nec enim. Sed vestibulum sem at gravida vehicula. Nullam ac orci gravida, fermentum est eu, rhoncus erat. Aliquam semper gravida lorem, eget congue enim aliquet nec. Nam ipsum velit, faucibus sed dapibus blandit, posuere non turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare massa non dui ultrices, a placerat ipsum bibendum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta rhoncus sapien, nec semper massa efficitur ac. Pellentesque eu eleifend leo, nec luctus ligula. Ut sit amet interdum magna. Vivamus sed lacus vitae purus rutrum pharetra. Fusce congue pulvinar diam vitae porttitor. Nullam urna dui, faucibus ac aliquet vel, maximus et tellus. Curabitur laoreet nisl tortor, egestas bibendum ex ultricies at. Donec dictum risus ut diam malesuada, et pellentesque neque molestie. Sed nulla mi, bibendum sed dapibus non, efficitur nec enim. Sed vestibulum sem at gravida vehicula. Nullam ac orci gravida, fermentum est eu, rhoncus erat. Aliquam semper gravida lorem, eget congue enim aliquet nec. Nam ipsum velit, faucibus sed dapibus blandit, posuere non turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare massa non dui ultrices, a placerat ipsum bibendum."
    ]
  };

    // Agrega esta validación para imágenes rotas
    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    };

  // Datos de artículos relacionados
  const relatedArticles = [
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    }, 
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    }, 
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    }, 
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/71a8d46c-f3b5-4ee2-9653-35164e23e459.jpg",
      title: "Sequoia! 'Ted Lane' regresa para una cuarta temporada"
    },
  ];

  return (
    <>
      <header className="bg-black py-7 text-center mb-8">
          <img src={logo} className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto" alt="Logo PlataformaMX" />
      </header>

      {/* Main content container */}
      <main className="w-full px-20 space-y-10">
        {/* Banner Section */}
        <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-500 rounded-3xl py-20 md:py-52 px-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden mb-8 md:mb-20">
          {/* Contenido del banner permanece igual */}
          <div className="flex-1 min-w-[180px]"></div>
          <div className="flex gap-6 justify-center sm:justify-end flex-1 min-w-[180px] relative"></div>
        </section>

        {/* Article title section */}
        <section className="mb-4 md:mb-6 bg-gray-100 rounded-3xl p-6 md:p-11">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-6xl leading-snug md:leading-tight">
            {articleData.title}
          </h2>
        </section>

        {/* Main article content */}
        <section className="mb-6 flex flex-col md:flex-row gap-30">
          {/* Main article */}
          <article className="md:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-14 gap-4">
              <p className="text-xs md:text-2xl font-light">
                Por {articleData.author} | {articleData.date}  
              </p>
              <p className="text-xl md:text-4xl font-bold">
                {articleData.category}
              </p>
            </div>
            
            <div className="w-full -mx-4 md:mx-0">
              <img 
                alt="Group of Oscar winners" 
                className="w-full h-auto min-h-[300px] md:min-h-[400px] object-cover rounded-none md:rounded-3xl mb-6 md:mb-10"
                src={articleData.images[0]} 
              />
              
              <p className="text-lg md:text-2xl leading-relaxed md:leading-loose mb-6 md:mb-10">
                {articleData.content[0]}
              </p>
              
              <img 
                alt="Another group photo" 
                className="w-full h-auto min-h-[300px] md:min-h-[400px] object-cover rounded-none md:rounded-3xl mb-6 md:mb-10"
                src={articleData.images[1]} 
              />
              
              <p className="text-lg md:text-2xl leading-relaxed md:leading-loose mb-6 md:mb-10">
                {articleData.content[1]}
              </p>
            </div>
          </article>

          {/* Related articles sidebar - Versión responsiva */}
            <aside className="md:w-1/3 my-24">
              <div className="bg-gray-200 rounded-xl p-3 mb-10 text-left w-auto inline-block text-3xl font-semibold text-gray-700">
                Leer Más:
              </div>
              
              {/* Versión desktop (se mantiene igual) */}
              <div className="hidden md:block">
                {relatedArticles.map((article, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 mb-5 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    onClick={() => handleRelatedArticleClick(article.id)}
                  >
                    <div className="w-50 h-40 rounded-md overflow-hidden relative">
                      <div className="absolute inset-0 overflow-hidden">
                        <img 
                          alt={article.title} 
                          className="w-full h-full object-cover rounded-md hover:scale-110 transition-transform duration-300"
                          src={article.image} 
                        />
                      </div>
                    </div>
                    <p className="text-xs leading-tight">
                      {article.title}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Versión móvil (slider horizontal) */}
              <div className="md:hidden relative w-full -mx-5">
                <div className="flex overflow-x-auto pb-6 space-x-4 px-0 scrollbar scrollbar-thumb-amber-500 ">
                  {relatedArticles.map((article, index) => (
                    <article 
                      key={`mobile-${index}`} 
                      className="flex-shrink-0 w-[280px] bg-black rounded-3xl overflow-hidden relative h-[300px]"
                    >
                      <div className="w-full h-full overflow-hidden cursor-pointer" onClick={() => handleRelatedArticleClick(article.id)}>
                        <img
                          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
                          src={article.image}
                          alt={article.title}
                        />
                      </div>
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