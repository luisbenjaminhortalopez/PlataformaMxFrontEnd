"use client";

import {
  ConfirmationModal,
  EmptyState,
  FloatingActionButton,
  PageHeader,
  PublicidadFormModal,
  PublicidadGrid
} from "@admin/components";
import { Publicidad, PublicidadForm } from "@/types/publicidad";
import { usePublicidad } from "@admin/hooks";
import { useState } from "react";

type Props = {
  publicidades: Publicidad[];
};

export const PublicidadPage = ({ publicidades }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("agregar");
  const [selectedItem, setSelectedItem] = useState<Publicidad | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const {
    agregarNuevaPublicidad,
    actualizarPublicidadExistente,
    eliminarPublicidadPorId
  } = usePublicidad();

  const handleOpenCreateForm = () => {
    setFormMode("agregar");
    setSelectedItem(null);
    setFormModalOpen(true);
  };

  const handleOpenEditForm = (item: Publicidad) => {
    setFormMode("editar");
    setSelectedItem(item);
    setFormModalOpen(true);
  };

  const handleSubmitForm = async (data: PublicidadForm) => {
    try {
      if (formMode === "agregar") {
        await agregarNuevaPublicidad(data);
      } else {
        await actualizarPublicidadExistente(data);
      }
      setFormModalOpen(false);
    } catch (error) {
      console.error("Error al procesar publicidad:", error);
    }
  };

  const handleRequestDelete = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await eliminarPublicidadPorId(itemToDelete);
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error al eliminar publicidad:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        title="Administrar Publicidad"
        description="Gestiona los anuncios publicitarios de tu plataforma"
      />

      {publicidades.length === 0 ? (
        <EmptyState
          title="No hay publicidades"
          message="Todavía no hay publicidades registradas."
          actionLabel="Agregar publicidad"
          onAction={handleOpenCreateForm}
        />
      ) : (
        <PublicidadGrid
          items={publicidades}
          onEdit={handleOpenEditForm}
          onDelete={handleRequestDelete}
        />
      )}

      <FloatingActionButton
        onClick={handleOpenCreateForm}
        label="Agregar publicidad"
      />

      <PublicidadFormModal
        isOpen={formModalOpen}
        modo={formMode}
        initialData={selectedItem || undefined}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleSubmitForm}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Eliminar Publicidad"
        message="¿Estás seguro de que deseas eliminar esta publicidad? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        danger
      />
    </div>
  );
};
