import { memo } from 'react';

export const Banner = memo(({ imageUrl }) => {
  if (!imageUrl) return null;
  
  return (
    <section className="w-full flex justify-center items-center">
      <img 
        src={imageUrl}
        alt="Publicidad"
        className="rounded-3xl w-full max-h-[400px] object-cover mb-10"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </section>
  );
});