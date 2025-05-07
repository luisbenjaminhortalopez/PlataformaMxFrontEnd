import { useState, useEffect } from "react";

export const FormularioNoticiaModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "agregar",
  initialData = {},
}) => {
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    autor: "",
    fecha_publicacion: "",
    fecha_vencimiento: "",
    imagen_portada: null,
    categoria_id: "",
    seccion01: "",
    imagen01: null,
    seccion02: "",
    imagen02: null,
  });

  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    if (modo === "editar" && initialData) {
      setForm({ ...initialData });
      setPreviewURL(initialData.imagen_portada);
    } else {
      setForm({
        id: null,
        titulo: "",
        autor: "",
        fecha_publicacion: "",
        fecha_vencimiento: "",
        imagen_portada: null,
        categoria_id: "",
        seccion01: "",
        imagen01: null,
        seccion02: "",
        imagen02: null,
      });
      setPreviewURL(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      if (name === "imagen_portada") setPreviewURL(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSubmit({ ...form });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-black text-white p-6 rounded w-[400px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          {modo === "agregar" ? "Agregar Noticia" : "Editar Noticia"}
        </h2>

        <div className="flex flex-col gap-3 text-sm">
          <label>
            Título
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <label>
            Autor
            <input
              type="text"
              name="autor"
              value={form.autor}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <div className="flex gap-2">
            <label className="flex-1">
              Publicación
              <input
                type="date"
                name="fecha_publicacion"
                value={form.fecha_publicacion}
                onChange={handleChange}
                className="mt-1 p-2 rounded bg-white text-black w-full"
              />
            </label>

            <label className="flex-1">
              Vencimiento
              <input
                type="date"
                name="fecha_vencimiento"
                value={form.fecha_vencimiento}
                onChange={handleChange}
                className="mt-1 p-2 rounded bg-white text-black w-full"
              />
            </label>
          </div>

          <div>
            <label className="block mb-1">Imagen portada</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("filePortada").click()}
                className="px-3 py-1 bg-white text-black rounded hover:opacity-80 text-sm"
              >
                Elegir archivo
              </button>
              <span className="text-xs text-gray-300">
                {form.imagen_portada ? form.imagen_portada.name : "Sin archivo"}
              </span>
            </div>
            <input
              id="filePortada"
              type="file"
              name="imagen_portada"
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
                className="mx-auto my-2 w-28 h-28 object-cover rounded"
              />
              <p>{form.imagen_portada?.name}</p>
              <p>Peso: {(form.imagen_portada?.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}

          <label>
            Categoría (ID)
            <input
              type="text"
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <label>
            Sección 1
            <input
              type="text"
              name="seccion01"
              value={form.seccion01}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <div>
            <label className="block mb-1">Imagen 1</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("fileImg1").click()}
                className="px-3 py-1 bg-white text-black rounded hover:opacity-80 text-sm"
              >
                Elegir archivo
              </button>
              <span className="text-xs text-gray-300">
                {form.imagen01 ? form.imagen01.name : "Sin archivo"}
              </span>
            </div>
            <input
              id="fileImg1"
              type="file"
              name="imagen01"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <label>
            Sección 2 (opcional)
            <input
              type="text"
              name="seccion02"
              value={form.seccion02}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            />
          </label>

          <div>
            <label className="block mb-1">Imagen 2 (opcional)</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("fileImg2").click()}
                className="px-3 py-1 bg-white text-black rounded hover:opacity-80 text-sm"
              >
                Elegir archivo
              </button>
              <span className="text-xs text-gray-300">
                {form.imagen02 ? form.imagen02.name : "Sin archivo"}
              </span>
            </div>
            <input
              id="fileImg2"
              type="file"
              name="imagen02"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-white text-black flex-1 py-2 rounded hover:opacity-80"
            >
              {modo === "agregar" ? "Crear" : "Guardar"}
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
