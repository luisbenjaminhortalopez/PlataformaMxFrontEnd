import { memo } from 'react';

export const Header = memo(({ logo }) => {
  return (
    <header className="bg-black py-7 text-center mb-8">
      <img
        src={logo}
        className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto"
        alt="Logo PlataformaMX"
      />
    </header>
  );
});
