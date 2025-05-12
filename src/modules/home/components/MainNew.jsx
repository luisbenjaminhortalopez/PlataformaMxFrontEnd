export const MainNew = ({
  slides,
  currentSlide,
  setCurrentSlide,
  handleNewsClick,
  prevSlide,
  nextSlide,
}) => {
  return (
    <article className="bg-black rounded-3xl overflow-hidden relative h-[500px] lg:h-[700px]">
      <div
        className="w-full h-full overflow-hidden cursor-pointer"
        onClick={() => handleNewsClick(slides[currentSlide].id)}
      >
        <img
          className="w-full h-full object-cover rounded-3xl hover:scale-110 transition-transform duration-300"
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
        />
      </div>

      {/* Capa de gradiente */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Texto */}
      <div className="absolute bottom-11 left-0 right-16 px-6 z-10">
        <p className="text-white text-xl lg:text-2xl font-bold drop-shadow-2xl leading-tight">
          {slides[currentSlide].title}
        </p>
      </div>

      {/* Botones de navegación */}
      <div className="absolute bottom-4 right-3 flex space-x-3 z-20">
        <button
          onClick={prevSlide}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg w-12 h-12 flex items-center justify-center transition-all border border-white/20 hover:border-white/40"
        >
          <span className="text-white text-2xl font-bold">&lt;</span>
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg w-12 h-12 flex items-center justify-center transition-all border border-white/20 hover:border-white/40"
        >
          <span className="text-white text-2xl font-bold">&gt;</span>
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-10 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </article>
  );
};