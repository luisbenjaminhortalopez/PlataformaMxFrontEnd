"use client";

import { obtenerRutaSlug } from "@admin/utils/slugUtils";
import { Slide } from "@/types/news";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "./image";

type Props = {
  slides?: Slide[];
};

const MainNews = ({ slides }: Props) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const AUTOPLAY_INTERVAL = 5000;

  const handleNewsClick = useCallback(() => {
    if (slides && slides.length > 0) {
      router.push(obtenerRutaSlug(slides[currentSlide]));
    }
  }, [slides, currentSlide, router]);

  const prevSlide = useCallback(() => {
    if (slides && slides.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  }, [slides]);

  const nextSlide = useCallback(() => {
    if (slides && slides.length > 0) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  }, [slides]);

  useEffect(() => {
    if (slides && slides.length > 1) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide();
      }, AUTOPLAY_INTERVAL);

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }
  }, [slides, nextSlide]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);

      autoplayTimerRef.current = setTimeout(() => {
        autoplayTimerRef.current = setInterval(() => {
          nextSlide();
        }, AUTOPLAY_INTERVAL);
      }, AUTOPLAY_INTERVAL * 2);
    }
  }, [nextSlide]);

  if (!slides || slides.length === 0) {
    return (
      <article className="bg-black rounded-3xl overflow-hidden relative h-full w-full flex items-center justify-center">
        <p className="text-white text-xl">No hay noticias disponibles</p>
      </article>
    );
  }

  return (
    <article
      className="bg-black rounded-3xl overflow-hidden relative h-[320px] lg:h-full w-full cursor-pointer"
      onClick={handleNewsClick}
    >
      <div className="w-full h-full overflow-hidden">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
          fallbackSrc="https://via.placeholder.com/1200x800?text=Imagen+no+disponible"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black via-black/50 to-transparent opacity-70" />
      <div className="absolute bottom-11 left-0 right-16 px-6 z-10">
        <p className="text-white text-xl lg:text-2xl font-bold drop-shadow-2xl leading-tight">
          {slides[currentSlide].title}
        </p>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-4 right-3 flex space-x-3 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
                pauseAutoplay();
              }}
              className="text-white text-2xl hover:text-gray-300 transition-colors"
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
                pauseAutoplay();
              }}
              className="text-white text-2xl hover:text-gray-300 transition-colors"
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="absolute bottom-6 left-10 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                  pauseAutoplay();
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </article>
  );
};

export default memo(MainNews);
