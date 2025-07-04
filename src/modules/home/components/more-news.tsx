import { NewsData } from "@/types/news";
import MoreNewsCard from "./more-news-card";

type Props = {
  newsData: NewsData | undefined;
};

export const MoreNews = ({ newsData }: Props) => {
  if (!newsData || !newsData.more || newsData.more.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 lg:mt-20 mb-16 lg:mb-28 px-4 sm:px-0 max-w-7xl mx-auto">
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
              slide={news}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
