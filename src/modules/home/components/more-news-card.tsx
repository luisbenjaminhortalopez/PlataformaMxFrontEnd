"use client";

import { obtenerRutaSlug } from "@admin/utils/slugUtils";
import { Slide } from "@/types/news";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Image } from "./image";

type Props = {
  image: string;
  description: string;
  slide: Slide;
};

const MoreNewsCard = ({ image, description, slide }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(obtenerRutaSlug(slide));
  };

  return (
    <article
      className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-80 bg-black rounded-3xl overflow-hidden relative h-[300px] sm:h-[350px] lg:h-96 mx-2"
      onClick={handleClick}
    >
      <div className="w-full h-full overflow-hidden cursor-pointer">
        <Image
          src={image}
          alt={description.substring(0, 20)}
          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
          fallbackSrc="https://via.placeholder.com/400x500?text=Imagen+no+disponible"
        />
      </div>
      <p className="text-white text-lg sm:text-xl lg:text-2xl p-4 lg:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
        {description}
      </p>
    </article>
  );
};

export default memo(MoreNewsCard);
