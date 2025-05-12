import { useState, useEffect } from "react";
import { obtenerCategorias } from "../services";

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

  const [previews, setPreviews] = useState({
    imagen_portada: null,
    imagen01: null,
    imagen02: null
  });
  
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data } = await obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (modo === "editar" && initialData) {
      setForm({
        id: initialData.id,
        titulo: initialData.titulo || "",
        autor: initialData.autor || "",
        fecha_publicacion: initialData.fecha_publicacion || "",
        fecha_vencimiento: initialData.fecha_vencimiento || "",
        imagen_portada: null,
        categoria_id: initialData.categoria_id?.toString() || "",
        seccion01: initialData.seccion01 || "",
        imagen01: null, 
        seccion02: initialData.seccion02 || "",
        imagen02: null, 
      });
      
      setPreviews({
        imagen_portada: initialData.imagen_portada_url || null,
        imagen01: initialData.imagen01_url || null,
        imagen02: initialData.imagen02_url || null
      });
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
      
      setPreviews({
        imagen_portada: null,
        imagen01: null,
        imagen02: null
      });
    }
    setError("");
  }, [isOpen, initialData, modo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      
      if (file) {
        setPreviews(prev => ({
          ...prev,
          [name]: URL.createObjectURL(file)
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (!form.titulo.trim()) return setError("El título es obligatorio.");
    if (!form.autor.trim()) return setError("El autor es obligatorio.");
    if (!form.fecha_publicacion) return setError("La fecha de publicación es obligatoria.");
    if (!form.fecha_vencimiento) return setError("La fecha de vencimiento es obligatoria.");
    if (!form.categoria_id) return setError("Selecciona una categoría.");
    if (!form.seccion01.trim()) return setError("La sección 1 es obligatoria.");
    
    if (modo === "agregar") {
      if (!form.imagen_portada) return setError("La imagen portada es obligatoria.");
      if (!form.imagen01) return setError("La imagen 1 es obligatoria.");
    }

    const formData = { ...form };
    
    if (modo === "editar") {
      if (!formData.imagen_portada && initialData.imagen_portada_url) {
        formData.imagen_portada_url = initialData.imagen_portada_url;
      }
      
      if (!formData.imagen01 && initialData.imagen01_url) {
        formData.imagen01_url = initialData.imagen01_url;
      }
      
      if (!formData.imagen02 && initialData.imagen02_url) {
        formData.imagen02_url = initialData.imagen02_url;
      }
    }

    setError("");
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const showImagePortada = previews.imagen_portada !== null;
  const showImagen01 = previews.imagen01 !== null;
  const showImagen02 = previews.imagen02 !== null;

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
                {form.imagen_portada ? form.imagen_portada.name : modo === "editar" && previews.imagen_portada ? "Imagen actual" : "Sin archivo"}
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

          {showImagePortada && (
            <div className="text-center text-xs text-gray-300">
              <img
                src={previews.imagen_portada}
                alt="Previsualización"
                className="mx-auto my-2 w-28 h-28 object-cover rounded"
              />
              {form.imagen_portada && (
                <>
                  <p>{form.imagen_portada.name}</p>
                  <p>Peso: {(form.imagen_portada.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              )}
            </div>
          )}

          <label>
            Categoría
            <select
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black w-full"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoria}
                </option>
              ))}
            </select>
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
                {form.imagen01 ? form.imagen01.name : modo === "editar" && previews.imagen01 ? "Imagen actual" : "Sin archivo"}
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

          {showImagen01 && (
            <div className="text-center text-xs text-gray-300">
              <img
                src={previews.imagen01}
                alt="Previsualización"
                className="mx-auto my-2 w-28 h-28 object-cover rounded"
              />
              {form.imagen01 && (
                <>
                  <p>{form.imagen01.name}</p>
                  <p>Peso: {(form.imagen01.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              )}
            </div>
          )}

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
                {form.imagen02 ? form.imagen02.name : modo === "editar" && previews.imagen02 ? "Imagen actual" : "Sin archivo"}
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

          {showImagen02 && (
            <div className="text-center text-xs text-gray-300">
              <img
                src={previews.imagen02}
                alt="Previsualización"
                className="mx-auto my-2 w-28 h-28 object-cover rounded"
              />
              {form.imagen02 && (
                <>
                  <p>{form.imagen02.name}</p>
                  <p>Peso: {(form.imagen02.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              )}
            </div>
          )}

          {error && (
            <p className="text-center text-red-400 text-sm mt-2">{error}</p>
          )}

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