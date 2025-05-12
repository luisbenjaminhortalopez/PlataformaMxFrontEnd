export const SecondNew = ({ image, description, onClick }) => {
  return (
    <article className="bg-black rounded-3xl overflow-hidden relative w-[340px] mx-auto">
      <div className="w-full h-80 overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
          src={image}
          alt={description}
        />
      </div>
      <p className="text-white text-xl p-4 absolute bottom-0 left-0 right-0 bg-black/50 leading-tight">
        {description}
      </p>
    </article>
  );
};