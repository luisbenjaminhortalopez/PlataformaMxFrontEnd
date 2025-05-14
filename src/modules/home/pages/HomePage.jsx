import { useNavigate } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/Logo.svg";
import { useNewsData, useAdvertisement } from "../hooks";
import { Header, Footer, Banner, MainNews, SecondaryNews, MoreNewsCard } from "../components";

export const HomePage = () => {
  const { newsData, loading, error } = useNewsData();
  const { banner } = useAdvertisement();
  const navigate = useNavigate();

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  const renderMainSection = () => {
    if (loading) {
      return <div className="text-center py-10">Cargando noticias...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-10">Error: {error}</div>;
    }

    if (!newsData || !newsData.slide) {
      return <div className="text-center py-10">No hay noticias disponibles</div>;
    }

    return (
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-8 lg:gap-14">
        <div className="space-y-8">
          {newsData.secondNews.slice(0, 2).map((news) => (
            <SecondaryNews
              key={news.id}
              image={news.image}
              description={news.description}
              onClick={() => handleNewsClick(news.id)}
            />
          ))}
        </div>

        <MainNews
          slides={[newsData.slide]}
          onNewsClick={(id) => handleNewsClick(id)}
        />

        <div className="space-y-8">
          {newsData.secondNews.slice(2).map((news) => (
            <SecondaryNews
              key={news.id}
              image={news.image}
              description={news.description}
              onClick={() => handleNewsClick(news.id)}
            />
          ))}
        </div>
      </section>
    );
  };

  const renderMoreNews = () => {
    if (!newsData || !newsData.more || newsData.more.length === 0) {
      return null;
    }

    return (
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
    );
  };

  return (
    <>
      <Header logo={logo} />

      <main className="w-full px-5 lg:px-10 space-y-10">
        <Banner imageUrl={banner} />
        {renderMainSection()}
        {renderMoreNews()}
      </main>

      <Footer logo={logo} />
    </>
  );
};
