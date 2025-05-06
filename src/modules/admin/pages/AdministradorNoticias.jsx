import { useState } from "react";
import { NewsCard, FormularioNoticiaModal, DeleteConfirmationModal, AddButton } from "../components";

export const AdministradorNoticias = () => {
  const [ noticias, setNoticias ] = useState([
    {
      id: 1,
      titulo:
        "Sheinbaum: México colaborará para que el fentanilo no llegue a EE.UU. y que haya diálogo.",
      autor: "Redacción",
      fechaPublicacion: "2024-05-01",
      fechaVencimiento: "2024-06-01",
      imagen: "https://via.placeholder.com/150",
      categoria: "Política",
      nota: "Esta es una nota de ejemplo sobre la noticia.",
    },
    {
      id: 2,
      titulo: "¿Está Elon Musk hundiendo sus acciones?",
      autor: "Analista",
      fechaPublicacion: "2024-05-02",
      fechaVencimiento: "2024-06-02",
      imagen: "https://via.placeholder.com/150",
      categoria: "Negocios",
      nota: "Otra nota de ejemplo para otra noticia.",
    },
  ]);

  const [ formOpen, setFormOpen ] = useState( false );
  const [ modoForm, setModoForm ] = useState( "agregar" );
  const [ formInitialData, setFormInitialData ] = useState( null );
  const [ showDeleteModal, setShowDeleteModal ] = useState( false );
  const [ selectedId, setSelectedId ] = useState( null );

  const openAgregarForm = () => {
    setModoForm("agregar");
    setFormInitialData(null);
    setFormOpen(true);
  };

  const openEditarForm = (data) => {
    setModoForm("editar");
    setFormInitialData(data);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (modoForm === "agregar") {
      setNoticias([...noticias, { ...data, id: Date.now() }]);
    } else {
      setNoticias(
        noticias.map((n) => (n.id === data.id ? { ...n, ...data } : n))
      );
    }
  };

  const confirmDelete = () => {
    setNoticias(noticias.filter((n) => n.id !== selectedId));
    setShowDeleteModal(false);
    setSelectedId(null);
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
    <div className="relative p-10 w-full">
      <h1 className="text-3xl font-bold mb-6">ADMINISTRAR NOTICIAS</h1>

      {noticias.map((n) => (
        <NewsCard
          key={n.id}
          image={n.imagen}
          title={n.titulo}
          onEdit={() => openEditarForm(n)}
          onDelete={() => handleDeleteClick(n.id)}
        />
      ))}

      <AddButton
        onClick={ openAgregarForm }
      />

      <FormularioNoticiaModal
        isOpen={formOpen}
        modo={modoForm}
        initialData={formInitialData}
        onClose={() => setFormOpen(false)}
        onSubmit={ handleSubmit }
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};