"use client";

import { crearSlugConId } from "@/modules/admin/utils/slugUtils";
import { NewsData, Slide } from "@/types/news";
import MainNews from "../components/main-news";

type Props = {
  newsData: NewsData | undefined;
};

const HomePage = ({ newsData }: Props) => {
  const handleNewsClick = (item: Slide) => {
    const slug =
      item.slug || crearSlugConId(item.title || item.description, item.id);
    // navigate(`/news/${slug}`);
    console.log(`/news/${slug}`);
  };

  if (!newsData || !newsData.slide || newsData.slide.length === 0) {
    return <div className="text-center py-10">No hay noticias disponibles</div>;
  }

  return (
    <>
      <div className="lg:hidden w-full mb-8 h-[320px]">
        <MainNews slides={newsData.slide} onNewsClick={handleNewsClick} />
      </div>
    </>
  );
};

export default HomePage;
