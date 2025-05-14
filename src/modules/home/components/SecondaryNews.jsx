import { memo } from 'react';

export const SecondaryNews = memo(({ image, description, onClick }) => {
  return (
    <article className="bg-black rounded-3xl overflow-hidden relative w-full sm:w-[340px] lg:w-full mx-auto h-[320px]">
      <div className="w-full h-full overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
          src={image}
          alt={description}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/340x320?text=Imagen+no+disponible";
          }}
        />
      </div>
      <p className="text-white text-xl p-4 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
        {description}
      </p>
    </article>
  );
});