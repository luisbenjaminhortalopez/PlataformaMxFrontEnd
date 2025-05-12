import { useState, useEffect } from "react";
import { AddButton, DeleteConfirmationModal } from "../components";
import { PublicidadCard } from "../components/PublicidadCard";
import { FormularioPublicidadModal } from "../components/FormularioPublicidadModal";
import {
  obtenerPublicidad,
  eliminarPublicidad,
  agregarPublicidad,
  actualizarPublicidad,
} from "../services/publicidadService";

export const AdministradorPublicidad = () => {
  const [publicidades, setPublicidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [modoForm, setModoForm] = useState("agregar");
  const [formInitialData, setFormInitialData] = useState(null);

  const fetchPublicidad = async () => {
    try {
      const { data } = await obtenerPublicidad();
      const formateadas = data.map((item) => ({
        id: item.id,
        imagen: item.imagen,
        nombre_anunciante: item.nombre_anunciante,
        fecha_expiracion: item.fecha_expiracion,
      }));
      setPublicidades(formateadas);
    } catch (error) {
      console.error("Error al obtener publicidad:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicidad();
  }, []);

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

  const handleSubmit = async (data) => {
    try {
      if (modoForm === "agregar") {
        await agregarPublicidad(data);
      } else {
        await actualizarPublicidad(data.id, data);
      }
      fetchPublicidad();
    } catch (error) {
      console.error("Error al guardar publicidad:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarPublicidad(selectedId);
      setPublicidades(publicidades.filter((p) => p.id !== selectedId));
    } catch (error) {
      console.error("Error al eliminar publicidad:", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="relative p-10 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6">ADMINISTRAR PUBLICIDAD</h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Cargando publicidades...</p>
      ) : publicidades.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 italic">
          Todavía no hay publicidades registradas.
        </p>
      ) : (
        publicidades.map((p) => (
          <PublicidadCard
            key={p.id}
            image={p.imagen}
            onEdit={() => openEditarForm(p)}
            onDelete={() => handleDeleteClick(p.id)}
          />
        ))
      )}

      <AddButton onClick={openAgregarForm} />

      <FormularioPublicidadModal
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