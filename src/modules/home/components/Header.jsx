import { memo } from 'react';
import { Link } from 'react-router';

export const Header = memo(({ logo }) => {
  return (
    <header className="bg-black py-7 text-center mb-8">
      <Link to="/">
        <img
          src={logo}
          className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto"
          alt="Logo PlataformaMX"
        />
      </Link>
    </header>
  );
});
