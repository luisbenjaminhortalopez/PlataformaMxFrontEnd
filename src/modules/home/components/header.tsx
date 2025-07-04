import Link from "next/link";
import { memo } from "react";

type Props = {
  logo: string;
};

export const Header = memo(({ logo }: Props) => {
  return (
    <header className="bg-black py-7 text-center mb-8">
      <Link href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] w-auto select-none mx-auto"
          alt="Logo PlataformaMX"
        />
      </Link>
    </header>
  );
});

Header.displayName = "Header";
