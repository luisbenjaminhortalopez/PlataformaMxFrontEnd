import { useState, useEffect } from "react";
import {
  NewsCard,
  FormularioNoticiaModal,
  DeleteConfirmationModal,
  AddButton,
} from "../components";

import {
  obtenerNoticias,
  agregarNoticia,
  actualizarNoticia,
  eliminarNoticia,
  obtenerDetalleNoticia,
} from "../services";

export const AdministradorNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [modoForm, setModoForm] = useState("agregar");
  const [formInitialData, setFormInitialData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

 const fetchNoticias = async () => {
  try {
    const { data } = await obtenerNoticias();
    const formateadas = data.map((noticia) => ({
      id: noticia.id,
      title: noticia.titulo,
      image: noticia.imagen_portada,
      fechaPublicacion: noticia.fecha_publicacion,
      fechaVencimiento: noticia.fecha_vencimiento,
    }));
    setNoticias(formateadas);
  } catch (error) {
    console.error("Error al obtener noticias:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchNoticias();
  }, []);

  const openAgregarForm = () => {
    setModoForm("agregar");
    setFormInitialData(null);
    setFormOpen(true);
  };


  const openEditarForm = async (noticiaResumen) => {
    try {
      const { data: detalle } = await obtenerDetalleNoticia(noticiaResumen.id);

      const noticiaCompleta = {
        ...detalle,
        imagen_portada: detalle.imagen_portada ?? null,
        imagen01: null, 
        imagen02: null,
      };

      setModoForm("editar");
      setFormInitialData(noticiaCompleta);
      setFormOpen(true);
    } catch (err) {
      console.error("Error al obtener detalle de la noticia:", err);
    }
  };


  const handleSubmit = async (data) => {
    try {
      if (modoForm === "agregar") {
        const response = await agregarNoticia(data);
        const { id, imagenes } = response.data;

        const nuevaNoticia = {
          id,
          titulo: data.titulo,
          imagen: imagenes.imagen_portada,
        };

        setNoticias((prev) => [...prev, nuevaNoticia]);
      } else {
        await actualizarNoticia(data.id, data);
        await fetchNoticias();
      }
    } catch (error) {
      console.error("Error al guardar noticia:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await eliminarNoticia(selectedId);
      setNoticias(noticias.filter((n) => n.id !== selectedId));
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="relative p-10 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6">ADMINISTRAR NOTICIAS</h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Cargando noticias...</p>
      ) : noticias.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 italic">
          Todavía no hay noticias registradas.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia) => (
            <NewsCard
              key={noticia.id}
              {...noticia}
              onEdit={() => openEditarForm(noticia)}
              onDelete={() => handleDeleteClick(noticia.id)}
            />
          ))}
        </div>
      )}

      <AddButton onClick={openAgregarForm} />

      <FormularioNoticiaModal
        isOpen={formOpen}
        modo={modoForm}
        initialData={formInitialData}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
