"use client";

import { Image } from "@home/components";
import { Badge, IconButton } from "../ui";
import { PencilIcon, TrashIcon } from "lucide-react";

type Props = {
  image: string;
  nombre: string;
  fechaExpiracion: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const PublicidadCard = ({
  image,
  nombre = "",
  fechaExpiracion = new Date().toISOString(),
  onEdit,
  onDelete
}: Props) => {
  const isExpired = new Date(fechaExpiracion) < new Date();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={`Publicidad de ${nombre}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 flex space-x-2">
          <IconButton
            icon={<PencilIcon size={16} />}
            onClick={onEdit}
            tooltip="Editar publicidad"
          />
          <IconButton
            icon={<TrashIcon size={16} />}
            onClick={onDelete}
            tooltip="Eliminar publicidad"
            variant="danger"
          />
        </div>

        {isExpired && (
          <Badge
            label="Expirado"
            color="red"
            className="absolute top-3 left-3"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-white text-lg mb-1 truncate">
          {nombre || "Anunciante"}
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Exp: {formatDate(fechaExpiracion)}
          </span>

          <Badge
            label={isExpired ? "Inactivo" : "Activo"}
            color={isExpired ? "gray" : "green"}
          />
        </div>
      </div>
    </div>
  );
};
