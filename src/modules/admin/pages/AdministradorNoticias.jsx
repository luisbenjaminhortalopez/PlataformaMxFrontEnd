import { useState, useEffect } from "react";
import {
  FormularioNoticiaModal,
  DeleteConfirmationModal,
  AddButton,
  SeccionNoticias
} from "../components";
import { useNoticias } from "../hooks";


export const MODO_FORM = {
  AGREGAR: "agregar",
  EDITAR: "editar"
};

export const AdministradorNoticias = () => {

  const [formOpen, setFormOpen] = useState(false);
  const [modoForm, setModoForm] = useState(MODO_FORM.AGREGAR);
  const [formInitialData, setFormInitialData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {
    noticias,
    loading,
    noticiasActivas,
    noticiasVencidas,
    fetchNoticias,
    agregarNuevaNoticia,
    actualizarNoticiaExistente,
    obtenerDetalleCompleto,
    eliminarNoticiaById
  } = useNoticias();

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  const openAgregarForm = () => {
    setModoForm(MODO_FORM.AGREGAR);
    setFormInitialData(null);
    setFormOpen(true);
  };

  const openEditarForm = async (noticiaResumen) => {
    try {
      const detalleNoticia = await obtenerDetalleCompleto(noticiaResumen.id);
      setModoForm(MODO_FORM.EDITAR);
      setFormInitialData(detalleNoticia);
      setFormOpen(true);
    } catch (err) {
      console.error("Error al obtener detalle de la noticia:", err);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modoForm === MODO_FORM.AGREGAR) {
        await agregarNuevaNoticia(data);
      } else {
        await actualizarNoticiaExistente(data);
      }
      setFormOpen(false);
    } catch (error) {
      console.error("Error al guardar noticia:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarNoticiaById(selectedId);
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
    } finally {
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="relative p-10 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6">ADMINISTRAR NOTICIAS</h1>

      {renderContenido(loading, noticias, noticiasActivas, noticiasVencidas, openEditarForm, handleDeleteClick)}

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
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

const renderContenido = (loading, noticias, noticiasActivas, noticiasVencidas, onEdit, onDelete) => {
  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando noticias...</p>;
  }
  
  if (noticias.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10 italic">
        Todavía no hay noticias registradas.
      </p>
    );
  }
  
  return (
    <>
      {noticiasActivas.length > 0 && (
        <SeccionNoticias
          titulo="🟢 Noticias Activas"
          noticias={noticiasActivas}
          onEdit={onEdit}
          onDelete={onDelete}
          className="mb-10"
        />
      )}

      {noticiasVencidas.length > 0 && (
        <SeccionNoticias
          titulo="🔴 Noticias Vencidas"
          noticias={noticiasVencidas}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
};