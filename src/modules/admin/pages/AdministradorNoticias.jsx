import { useState } from "react";
import { AddButton, DeleteConfirmationModal, NewsCard } from "../components";

export const AdministradorNoticias = () => {
  const [noticias, setNoticias] = useState([
    {
      id: 1,
      title: "Sheinbaum: México colaborará para que el fentanilo no llegue a EE.UU. y que haya diálogo.",
      image: "/ruta/de/imagen1.jpg",
    },
    {
      id: 2,
      title: "¿Está Elon Musk hundiendo sus acciones?",
      image: "/ruta/de/imagen2.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setNoticias(noticias.filter((n) => n.id !== selectedId));
    setShowModal(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="relative p-10 w-full">
      <h1 className="text-3xl font-bold mb-6">ADMINISTRAR NOTICIAS</h1>

      {noticias.map((n) => (
        <NewsCard
          key={n.id}
          image={n.image}
          title={n.title}
          onEdit={() => {}}
          onDelete={() => handleDeleteClick(n.id)}
        />
      ))}

      <AddButton onClick={() => {}} />

      <DeleteConfirmationModal
        isOpen={showModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
