"use client";

import { useNoticias } from "@admin/hooks";
import { FormattedNews, NewsForm } from "@/types/news";
import {
  ConfirmationModal,
  FloatingActionButton,
  ListaNoticias,
  LoadingState,
  NoticiaFormModal,
  PageHeader
} from "@admin/components";
import { useEffect, useState } from "react";

const AdminNoticias = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("agregar");
  const [selectedItem, setSelectedItem] = useState<
    (NewsForm & { slug: string }) | null
  >(null);

  const {
    noticias,
    noticiasActivas,
    noticiasVencidas,
    loading,
    fetchNoticias,
    obtenerDetalleCompleto,
    agregarNuevaNoticia,
    actualizarNoticiaExistente,
    eliminarNoticiaById
  } = useNoticias();

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  const handleOpenCreateForm = () => {
    setFormMode("agregar");
    setSelectedItem(null);
    setFormModalOpen(true);
  };

  const handleOpenEditForm = async (item: FormattedNews) => {
    try {
      const detalleNoticia = await obtenerDetalleCompleto(item.id);
      setFormMode("editar");
      setSelectedItem(detalleNoticia);
      setFormModalOpen(true);
    } catch (err) {
      console.error("Error al obtener detalle de la noticia:", err);
    }
  };

  const handleSubmitForm = async (data: NewsForm) => {
    try {
      if (formMode === "agregar") {
        await agregarNuevaNoticia(data);
      } else {
        await actualizarNoticiaExistente(data);
      }
      setFormModalOpen(false);
    } catch (error) {
      console.error("Error al procesar noticia:", error);
    }
  };

  const handleRequestDelete = (id: number) => {
    if (!selectedItem) return;
    setSelectedItem({ ...selectedItem, id });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;
    try {
      await eliminarNoticiaById(selectedItem.id!);
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        title="Administrar Noticias"
        description="Gestiona las noticias y artículos de tu plataforma"
      />

      {loading ? (
        <LoadingState message="Cargando noticias..." />
      ) : (
        <ListaNoticias
          noticias={noticias}
          handleOpenCreateForm={handleOpenCreateForm}
          handleOpenEditForm={handleOpenEditForm}
          handleRequestDelete={handleRequestDelete}
          noticiasActivas={noticiasActivas}
          noticiasVencidas={noticiasVencidas}
        />
      )}

      <FloatingActionButton
        onClick={handleOpenCreateForm}
        label="Crear noticia"
      />

      <NoticiaFormModal
        isOpen={formModalOpen}
        modo={formMode}
        initialData={selectedItem || undefined}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleSubmitForm}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Eliminar Noticia"
        message="¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        danger
      />
    </div>
  );
};

export default AdminNoticias;
