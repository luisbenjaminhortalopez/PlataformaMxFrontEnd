import { memo } from 'react';

export const MoreNewsCard = memo(({ image, description, onClick }) => {
  return (
    <article
      className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-80 bg-black rounded-3xl overflow-hidden relative h-[300px] sm:h-[350px] lg:h-96 mx-2"
      onClick={onClick}
    >
      <div className="w-full h-full overflow-hidden cursor-pointer">
        <img
          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
          src={image}
          alt={description.substring(0, 20)}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x500?text=Imagen+no+disponible";
          }}
        />
      </div>
      <p className="text-white text-lg sm:text-xl lg:text-2xl p-4 lg:p-5 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
        {description}
      </p>
    </article>
  );
});