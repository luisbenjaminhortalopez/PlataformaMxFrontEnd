"use client";

import { useRouter } from "next/navigation";
import { Image } from "@home/components";
import { logout } from "@/actions";
import { HamburguerButton } from "./hamburguer-button";

type Props = {
  toggleSidebar: () => void;
};

export const Sidebar = ({ toggleSidebar }: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    void logout();
  };

  return (
    <aside className="bg-black w-72 h-screen flex flex-col justify-between fixed left-0 top-0 z-40">
      <div>
        <div className="px-4 pt-4">
          <HamburguerButton toggleSidebar={toggleSidebar} className="p-1" />
        </div>

        <div className="py-4">
          <Image
            src="/logodos.png"
            alt="PlataformaMX"
            className="h-10 mx-auto"
          />
        </div>

        <nav className="flex flex-col">
          <button
            onClick={() => router.push("/admin/publicidad")}
            className="text-white hover:bg-[#2D2D2D] py-4 px-6 text-2xl font-medium border-y border-[#404040]"
          >
            Publicidad
          </button>
          <button
            onClick={() => router.push("/admin/noticias")}
            className="text-white hover:bg-[#2D2D2D] py-4 px-6 text-2xl font-medium border-b border-[#404040]"
          >
            Noticias
          </button>
        </nav>
      </div>

      <div className="px-6 py-4">
        <button
          onClick={handleLogout}
          className="w-full bg-[#5C5C5C] text-white py-2 rounded hover:bg-[#6e6e6e] transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
