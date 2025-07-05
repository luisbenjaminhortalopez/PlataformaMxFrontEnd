/* eslint-disable @next/next/no-img-element */
"use client";

type Props = {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
};

export const Image = ({ src, alt, fallbackSrc, className }: Props) => {
  return (
    <img
      alt={alt}
      className={className}
      src={src}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (fallbackSrc) {
          target.src = fallbackSrc;
        } else {
          target.style.display = "none";
        }
      }}
    />
  );
};
