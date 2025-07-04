import { NewsData } from "@/types/news";
import MainNews from "./main-news";
import SecondaryNews from "./secondary-news";

type Props = {
  newsData: NewsData | undefined;
};

export const MainSection = ({ newsData }: Props) => {
  if (!newsData || !newsData.slide || newsData.slide.length === 0) {
    return <div className="text-center py-10">No hay noticias disponibles</div>;
  }

  return (
    <>
      <div className="lg:hidden w-full mb-8 h-[320px]">
        <MainNews slides={newsData.slide} />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-8 lg:gap-14 items-start max-w-7xl mx-auto">
        <div className="space-y-8">
          {newsData.secondNews.slice(0, 2).map((news) => (
            <SecondaryNews
              key={news.id}
              image={news.image}
              description={news.description}
              slide={news}
            />
          ))}
        </div>

        <div className="hidden lg:block h-full">
          <div className="h-full flex">
            <MainNews slides={newsData.slide} />
          </div>
        </div>

        <div className="space-y-8">
          {newsData.secondNews.slice(2).map((news) => (
            <SecondaryNews
              key={news.id}
              image={news.image}
              description={news.description}
              slide={news}
            />
          ))}
        </div>
      </section>
    </>
  );
};
