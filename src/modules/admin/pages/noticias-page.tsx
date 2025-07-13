"use client";

import { useNoticias } from "@admin/hooks";
import { FormattedNews, NewsForm } from "@/types/news";
import {
  ConfirmationModal,
  FloatingActionButton,
  ListaNoticias,
  NoticiaFormModal,
  PageHeader
} from "@admin/components";
import { useState, useTransition } from "react";
import { actualizarNoticia, agregarNoticias } from "@actions";

type Props = {
  noticias: FormattedNews[];
};

export const NoticiasPage = ({ noticias }: Props) => {
  const [isSubmitting, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("agregar");
  const [selectedItem, setSelectedItem] = useState<
    (NewsForm & { slug: string }) | null
  >(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const hoy = new Date();

  const noticiasActivas = noticias.filter(
    (n) => !n.fechaVencimiento || new Date(n.fechaVencimiento) >= hoy
  );

  const noticiasVencidas = noticias.filter(
    (n) => n.fechaVencimiento && new Date(n.fechaVencimiento) < hoy
  );

  const { obtenerDetalleCompleto, eliminarNoticiaById } = useNoticias();

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
    startTransition(async () => {
      try {
        if (formMode === "agregar") {
          await agregarNoticias({
            ...data,
            fecha_vencimiento: data.fecha_vencimiento || null
          });
        } else {
          await actualizarNoticia(data.id!, {
            ...data,
            fecha_vencimiento: data.fecha_vencimiento || null
          });
        }
        setFormModalOpen(false);
      } catch (error) {
        console.error("Error al procesar noticia:", error);
      }
    });
  };

  const handleRequestDelete = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await eliminarNoticiaById(itemToDelete);
      setShowDeleteModal(false);
      setItemToDelete(null);
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

      <ListaNoticias
        noticias={noticias}
        handleOpenCreateForm={handleOpenCreateForm}
        handleOpenEditForm={handleOpenEditForm}
        handleRequestDelete={handleRequestDelete}
        noticiasActivas={noticiasActivas}
        noticiasVencidas={noticiasVencidas}
      />

      <FloatingActionButton
        onClick={handleOpenCreateForm}
        label="Crear noticia"
      />

      <NoticiaFormModal
        isOpen={formModalOpen}
        modo={formMode}
        initialData={selectedItem || undefined}
        onClose={() => setFormModalOpen(false)}
        isSubmitting={isSubmitting}
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
