import { useState, useEffect } from "react";
import { 
  PageHeader, 
  FloatingActionButton, 
  ConfirmationModal, 
  EmptyState, 
  LoadingState 
} from "../components";

import { 
  PublicidadGrid, 
  PublicidadFormModal
} from "../components";

import { usePublicidad } from "../hooks";

export const AdministradorPublicidad = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("agregar");
  const [selectedItem, setSelectedItem] = useState(null);
  
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

  const handleOpenEditForm = (item) => {
    setFormMode("editar");
    setSelectedItem(item);
    setFormModalOpen(true);
  };

  const handleSubmitForm = async (data) => {
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

  const handleRequestDelete = (id) => {
    setSelectedItem({ id });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
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
        initialData={selectedItem}
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