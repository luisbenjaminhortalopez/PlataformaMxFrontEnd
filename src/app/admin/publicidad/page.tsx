"use client";

import {
  ConfirmationModal,
  EmptyState,
  FloatingActionButton,
  LoadingState,
  PageHeader,
  PublicidadFormModal,
  PublicidadGrid
} from "@admin/components";
import { Publicidad, PublicidadForm } from "@/types/publicidad";
import { usePublicidad } from "@admin/hooks";
import { useState, useEffect } from "react";

const AdminPublicidad = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("agregar");
  const [selectedItem, setSelectedItem] = useState<Publicidad | null>(null);

  const {
    publicidades,
    loading,
    fetchPublicidad,
    agregarNuevaPublicidad,
    actualizarPublicidadExistente,
    eliminarPublicidadPorId
  } = usePublicidad();

  useEffect(() => {
    fetchPublicidad();
  }, [fetchPublicidad]);

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
    if (!selectedItem) return; // TODO: Check if this is necessary
    setSelectedItem({ ...selectedItem, id });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;
    try {
      await eliminarPublicidadPorId(selectedItem.id);
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error al eliminar publicidad:", error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Cargando publicidades..." />;
    }

    if (publicidades.length === 0) {
      return (
        <EmptyState
          title="No hay publicidades"
          message="Todavía no hay publicidades registradas."
          actionLabel="Agregar publicidad"
          onAction={handleOpenCreateForm}
        />
      );
    }

    return (
      <PublicidadGrid
        items={publicidades}
        onEdit={handleOpenEditForm}
        onDelete={handleRequestDelete}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        title="Administrar Publicidad"
        description="Gestiona los anuncios publicitarios de tu plataforma"
      />

      {renderContent()}

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

export default AdminPublicidad;
