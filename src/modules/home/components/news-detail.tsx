import { NewsDetailMapped } from "@/types/news";
import { Image } from "./image";

type Props = {
  newsDetail: NewsDetailMapped;
};

export const NewsDetail = async ({ newsDetail }: Props) => {
  return (
    <article className="w-full md:w-2/3">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 md:mb-8 lg:mb-14 gap-2 md:gap-4">
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-light">
          Por {newsDetail.author} | {newsDetail.date}
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
          {newsDetail.category}
        </p>
      </div>

      <div className="w-full">
        {newsDetail.images.map((img, idx) => (
          <div key={idx} className="mb-6 md:mb-10">
            <Image
              src={img}
              alt={`Imagen ${idx + 1}`}
              className="w-full h-auto min-h-[200px] sm:min-h-[300px] md:min-h-[400px] object-cover rounded-lg md:rounded-3xl mb-4 md:mb-6"
              fallbackSrc="https://via.placeholder.com/600x400?text=Imagen+no+disponible"
            />
            {newsDetail.content[idx] && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose px-1 sm:px-0">
                {newsDetail.content[idx]}
              </p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
};
