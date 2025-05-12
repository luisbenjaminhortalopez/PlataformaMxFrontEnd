import { useState, useEffect } from "react";

export const FormularioPublicidadModal = ({
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

  useEffect(() => {
    if (modo === "editar" && initialData) {
      setForm({
        id: initialData.id,
        nombre_anunciante: initialData.nombre_anunciante,
        fecha_expiracion: initialData.fecha_expiracion?.split("T")[0],
        file: null,
      });
      setPreviewURL(initialData.imagen || null);
    } else {
      setForm({ id: null, nombre_anunciante: "", fecha_expiracion: "", file: null });
      setPreviewURL(null);
    }
    setError("");
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, file }));
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-black text-white p-6 rounded w-[400px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          {modo === "agregar" ? "Agregar Publicidad" : "Editar Publicidad"}
        </h2>

        <div className="flex flex-col gap-3 text-sm">
          <label>
            Anunciante
            <input
              type="text"
              name="nombre_anunciante"
              value={form.nombre_anunciante}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <label>
            Expiración
            <input
              type="date"
              name="fecha_expiracion"
              value={form.fecha_expiracion}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <div>
            <label className="block mb-1">Subir imágen</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("filePublicidad").click()}
                className="px-3 py-1 bg-white text-black rounded hover:opacity-80 text-sm"
              >
                Seleccionar archivo
              </button>
              <span className="text-xs text-gray-300">
                {form.file ? form.file.name : "Sin archivos seleccionados"}
              </span>
            </div>
            <input
              id="filePublicidad"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {previewURL && (
            <div className="text-center text-xs text-gray-300">
              <img
                src={previewURL}
                alt="Previsualización"
                className="mx-auto my-2 w-full max-h-48 object-contain rounded"
              />
              <p>Nombre: {form.file?.name}</p>
              <p>Peso: {(form.file?.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}

          {error && (
            <p className="text-center text-red-400 text-sm mt-2">{error}</p>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-gray-300 text-black flex-1 py-2 rounded hover:opacity-80"
            >
              {modo === "agregar" ? "Subir" : "Actualizar"}
            </button>

            <button
              onClick={onClose}
              className="bg-red-600 flex-1 py-2 rounded hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};