import { useState, useRef, useEffect } from "react";

export const OptionsMenu = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
      >
        &#8942;
      </button>

      {open && (
        <div className="absolute top-10 right-0 bg-black text-white rounded shadow w-24 z-50">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full py-1 px-3 text-left hover:bg-gray-800"
          >
            Editar
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full py-1 px-3 text-left text-red-500 hover:bg-gray-800"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};
