import { useState } from "react";

export const NewsCard = ({ image, title, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border border-black rounded p-4 mb-6 relative flex gap-4 items-start">
      <img
        src={image}
        alt="Noticia"
        className="w-32 h-32 object-cover rounded"
      />

      <div className="flex-1">
        <p className="text-lg">{title}</p>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
        >
          &#8942;
        </button>

        {menuOpen && (
          <div className="absolute top-10 right-0 bg-black text-white rounded shadow w-24">
            <button
              onClick={onEdit}
              className="w-full py-1 px-3 text-left hover:bg-gray-800"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="w-full py-1 px-3 text-left text-red-500 hover:bg-gray-800"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
