"use client";

import { obtenerRutaSlug } from "@admin/utils";
import { Slide } from "@/types/news";
import { useRouter } from "next/navigation";
import { Image } from "./image";

type Props = {
  relatedNews?: Slide[];
};

export const RelatedNews = ({ relatedNews }: Props) => {
  const router = useRouter();

  const handleRelatedArticleClick = (article: Slide) => {
    router.push(obtenerRutaSlug(article));
  };

  return (
    <>
      {relatedNews && relatedNews.length > 0 && (
        <aside className="w-full md:w-1/3 my-6 md:my-12 lg:my-24">
          <div className="bg-gray-200 rounded-lg md:rounded-xl p-2 md:p-3 mb-5 md:mb-10 text-left inline-block text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
            Leer Más:
          </div>

          <div className="hidden md:block">
            {relatedNews.slice(0, 5).map((article, index) => (
              <div
                key={index}
                className="flex gap-4 mb-5 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                onClick={() => handleRelatedArticleClick(article)}
              >
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-md overflow-hidden relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-md hover:scale-110 transition-transform duration-300"
                    fallbackSrc="https://via.placeholder.com/600x400?text=Imagen+no+disponible"
                  />
                </div>
                <p className="text-xs md:text-sm lg:text-base leading-tight flex-grow">
                  {article.title}
                </p>
              </div>
            ))}
          </div>

          <div className="md:hidden relative w-full">
            <div className="flex overflow-x-auto pb-6 space-x-4 px-0 scrollbar scrollbar-thumb-amber-500">
              {relatedNews.slice(0, 5).map((article, index) => (
                <article
                  key={`mobile-${index}`}
                  className="flex-shrink-0 w-[250px] bg-black rounded-xl overflow-hidden relative h-[250px]"
                  onClick={() => handleRelatedArticleClick(article)}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                    fallbackSrc="https://via.placeholder.com/600x400?text=Imagen+no+disponible"
                  />
                  <p className="text-white text-sm p-3 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
                    {article.title}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
