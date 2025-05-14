import { useNavigate, useParams } from 'react-router';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../../../assets/Logo.svg';
import { useNewsDetails, useRelatedNews, useAdvertisement } from '../hooks/useNewsDetails';
import { Header, Footer, Banner } from '../components';

export const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { newsDetail, loading, error } = useNewsDetails(id);
  const { relatedNews } = useRelatedNews(id);
  const { banner } = useAdvertisement();

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
  };

  const handleRelatedArticleClick = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  if (loading) {
    return (
      <>
        <Header logo={logo} />
        <div className="text-center py-10">Cargando...</div>
        <Footer logo={logo} />
      </>
    );
  }

  if (error || !newsDetail) {
    return (
      <>
        <Header logo={logo} />
        <div className="text-center text-red-500 py-10">
          {error || "Noticia no encontrada"}
        </div>
        <Footer logo={logo} />
      </>
    );
  }

  return (
    <>
      <Header logo={logo} />

      <main className="w-full px-5 md:px-20 space-y-10">
        <Banner imageUrl={banner} />

        <section className="mb-4 md:mb-6 bg-gray-100 rounded-3xl p-6 md:p-11">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-6xl leading-snug md:leading-tight">
            {newsDetail.title}
          </h2>
        </section>

        <section className="mb-6 flex flex-col md:flex-row gap-10">
          <article className="md:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-14 gap-4">
              <p className="text-xs md:text-2xl font-light">
                Por {newsDetail.author} | {newsDetail.date}
              </p>
              <p className="text-xl md:text-4xl font-bold">
                {newsDetail.category}
              </p>
            </div>

            <div className="w-full -mx-4 md:mx-0">
              {newsDetail.images.map((img, idx) => (
                <div key={idx}>
                  <img 
                    alt={`Imagen ${idx + 1}`} 
                    className="w-full h-auto min-h-[300px] md:min-h-[400px] object-cover rounded-none md:rounded-3xl mb-6 md:mb-10"
                    src={img}
                    onError={handleImageError}
                  />
                  {newsDetail.content[idx] && (
                    <p className="text-lg md:text-2xl leading-relaxed md:leading-loose mb-6 md:mb-10">
                      {newsDetail.content[idx]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </article>

          {relatedNews && relatedNews.length > 0 && (
            <aside className="md:w-1/3 my-24">
              <div className="bg-gray-200 rounded-xl p-3 mb-10 text-left inline-block text-3xl font-semibold text-gray-700">
                Leer Más:
              </div>

              <div className="hidden md:block">
                {relatedNews.slice(0, 5).map((article, index) => (
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

              <div className="md:hidden relative w-full -mx-5">
                <div className="flex overflow-x-auto pb-6 space-x-4 px-0 scrollbar scrollbar-thumb-amber-500">
                  {relatedNews.slice(0, 5).map((article, index) => (
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
          )}
        </section>
      </main>

      <Footer logo={logo} />
    </>
  );
};
