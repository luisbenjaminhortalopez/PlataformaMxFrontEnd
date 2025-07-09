"use client";

import { FormattedNews } from "@/types/news";
import { Badge } from "../ui";
import { NoticiaCard } from "./noticia-card";

type Props = {
  title: string;
  badge?: {
    label: string;
    color: string;
  };
  items: FormattedNews[];
  onEdit: (item: FormattedNews) => void;
  onDelete: (id: number) => void;
};

export const NoticiasGrid = ({
  title,
  badge,
  items,
  onEdit,
  onDelete
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {badge && <Badge label={badge.label} color={badge.color} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <NoticiaCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            fechaPublicacion={item.fechaPublicacion}
            fechaVencimiento={item.fechaVencimiento}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
