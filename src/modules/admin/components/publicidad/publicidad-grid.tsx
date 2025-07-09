"use client";

import { Publicidad } from "@/types/publicidad";
import { PublicidadCard } from "./publicidad-card";

type Props = {
  items: Publicidad[];
  onEdit: (item: Publicidad) => void;
  onDelete: (id: number) => void;
};

export const PublicidadGrid = ({ items, onEdit, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.map((item) => (
        <PublicidadCard
          key={item.id}
          image={item.imagen}
          nombre={item.nombre_anunciante}
          fechaExpiracion={item.fecha_expiracion}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};
