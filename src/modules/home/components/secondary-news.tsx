"use client";

import { obtenerRutaSlug } from "@admin/utils/slugUtils";
import { Slide } from "@/types/news";
import Link from "next/link";
import { memo } from "react";

type Props = {
  image: string;
  description: string;
  slide: Slide;
};

const SecondaryNews = ({ image, description, slide }: Props) => {
  return (
    <article className="bg-black rounded-3xl overflow-hidden relative w-full sm:w-[340px] lg:w-full mx-auto h-[320px]">
      <Link
        href={obtenerRutaSlug(slide)}
        className="w-full h-full overflow-hidden cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
          src={image}
          alt={description}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/340x320?text=Imagen+no+disponible";
          }}
        />
      </Link>
      <p className="text-white text-xl p-4 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
        {description}
      </p>
    </article>
  );
};

export default memo(SecondaryNews);
