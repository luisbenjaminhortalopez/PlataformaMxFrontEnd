import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

type Props = {
  logo: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
};

export const Footer = memo(({ logo, socialLinks }: Props) => {
  const {
    facebook = "#",
    instagram = "#",
    twitter = "#",
    youtube = "#"
  } = socialLinks;

  return (
    <footer className="bg-black py-10 md:py-14 px-6 sm:px-12 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-700 text-center">
          <p className="text-gray-500 text-xs">v1.0.1</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
