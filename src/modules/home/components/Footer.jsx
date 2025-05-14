import { memo } from 'react';

export const Footer = memo(({ logo }) => {
  return (
    <footer className="bg-black py-10 md:py-14 px-6 sm:px-12 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
          <img
            src={logo}
            className="max-h-[70px] md:max-h-[100px] lg:max-h-[140px] w-auto select-none mx-auto md:mx-0"
            alt="Logo footer"
          />
          <div className="flex flex-col items-center md:items-end space-y-5 md:space-y-8">
            <p className="text-white text-lg md:text-2xl lg:text-4xl text-center md:text-right mb-5 md:mb-8">
              Síguenos en nuestras redes sociales:
            </p>
            <div className="flex space-x-7 md:space-x-10 text-3xl md:text-5xl lg:text-8xl">
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
