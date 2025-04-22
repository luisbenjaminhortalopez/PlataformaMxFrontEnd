import Logo from '../assets/logo.svg';

export const Sidebar = () => {
  return (
    <aside className="bg-black w-72 h-screen flex flex-col justify-between">
    
      <div>
        <div className="py-6">
          <img src={ Logo } alt="PlataformaMX" className="h-10 mx-auto"/>
        </div>

        <nav className="flex flex-col">
          <button className="text-white hover:bg-[#2D2D2D] py-4 px-6 text-2xl font-medium border-y border-[#404040]">
            Publicidad
          </button>
          <button className="text-white hover:bg-[#2D2D2D] py-4 px-6 text-2xl font-medium border-b border-[#404040]">
            Noticias
          </button>
        </nav>
      </div>

      <div className="px-6 py-4">
        <button className="w-full bg-[#5C5C5C] text-white py-2 rounded hover:bg-[#6e6e6e] transition">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
