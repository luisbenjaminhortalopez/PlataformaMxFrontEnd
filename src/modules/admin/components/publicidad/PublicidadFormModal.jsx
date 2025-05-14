import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X, Upload, Calendar, User } from "lucide-react";

export const PublicidadFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "agregar",
  initialData = {},
}) => {
  const [form, setForm] = useState({
    id: null,
    nombre_anunciante: "",
    fecha_expiracion: "",
    file: null,
  });

  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    
    if (modo === "editar" && initialData) {
      setForm({
        id: initialData.id,
        nombre_anunciante: initialData.nombre_anunciante || "",
        fecha_expiracion: initialData.fecha_expiracion?.split("T")[0] || "",
        file: null,
      });
      setPreviewURL(initialData.imagen || null);
    } else {
      setForm({ id: null, nombre_anunciante: "", fecha_expiracion: "", file: null });
      setPreviewURL(null);
    }
    setError("");
  }, [isOpen, initialData, modo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files.length > 0) {
      handleFileChange(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (file) => {
    // Valida el tamaño del archivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Máximo 5MB permitido.");
      return;
    }

    setForm((prev) => ({ ...prev, file }));
    setPreviewURL(URL.createObjectURL(file));
    setError("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!form.nombre_anunciante.trim()) {
      setError("El nombre del anunciante es obligatorio.");
      return;
    }
    if (!form.fecha_expiracion) {
      setError("La fecha de expiración es obligatoria.");
      return;
    }
    if (modo === "agregar" && !form.file) {
      setError("Debes subir una imagen.");
      return;
    }

    setError("");
    onSubmit({ ...form });
  };

  const calculateMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div 
        className="bg-zinc-800 text-white p-6 rounded-lg shadow-xl w-full max-w-md relative z-10 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {modo === "agregar" ? "Agregar Publicidad" : "Editar Publicidad"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <User size={16} className="mr-2" />
              Nombre del anunciante
            </label>
            <input
              type="text"
              name="nombre_anunciante"
              value={form.nombre_anunciante}
              onChange={handleChange}
              className="w-full p-3 rounded bg-zinc-700 border border-zinc-600 focus:border-zinc-400 focus:ring-1 focus:ring-blue-500 outline-none transition"
              placeholder="Nombre del anunciante"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Calendar size={16} className="mr-2" />
              Fecha de expiración
            </label>
            <input
              type="date"
              name="fecha_expiracion"
              value={form.fecha_expiracion}
              min={calculateMinDate()}
              onChange={handleChange}
              className="w-full p-3 rounded bg-zinc-700 border border-zinc-600 focus:border-zinc-400 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Upload size={16} className="mr-2" />
              Imagen publicitaria
            </label>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                isDragging ? "border-blue-500 bg-blue-500/10" : "border-zinc-600"
              } transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                id="filePublicidad"
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              
              {!previewURL ? (
                <div className="py-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">
                    Arrastra una imagen aquí o{" "}
                    <button
                      type="button"
                      onClick={() => document.getElementById("filePublicidad").click()}
                      className="text-blue-500 hover:text-blue-400 focus:outline-none"
                    >
                      haz clic para seleccionar
                    </button>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF hasta 5MB
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={previewURL}
                    alt="Previsualización"
                    className="mx-auto my-2 max-h-40 rounded object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewURL(null);
                      setForm((prev) => ({ ...prev, file: null }));
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <p className="mt-2 text-xs text-gray-400">
                    {form.file ? (
                      <>
                        Archivo: {form.file.name}
                        <br />
                        Tamaño: {(form.file.size / 1024 / 1024).toFixed(2)} MB
                      </>
                    ) : (
                      "Imagen actual"
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-800 rounded p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 font-medium rounded transition-colors"
            >
              {modo === "agregar" ? "Subir Publicidad" : "Actualizar Publicidad"}
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 bg-zinc-700 hover:bg-gray-700 rounded transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PublicidadFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modo: PropTypes.oneOf(["agregar", "editar"]),
  initialData: PropTypes.object
};