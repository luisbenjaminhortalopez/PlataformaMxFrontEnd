"use client";

import { EmptyState } from "../ui";
import { FormattedNews } from "@/types/news";
import { NoticiasGrid } from "./noticias-grid";

type Props = {
  noticias: FormattedNews[];
  handleOpenCreateForm: () => void;
  handleOpenEditForm: (item: FormattedNews) => void;
  handleRequestDelete: (id: number) => void;
  noticiasActivas?: FormattedNews[];
  noticiasVencidas?: FormattedNews[];
};

export const ListaNoticias = ({
  noticias,
  handleOpenCreateForm,
  handleOpenEditForm,
  handleRequestDelete,
  noticiasActivas = [],
  noticiasVencidas = []
}: Props) => {
  if (noticias.length === 0) {
    return (
      <EmptyState
        title="No hay noticias"
        message="Todavía no hay noticias registradas."
        actionLabel="Crear noticia"
        onAction={handleOpenCreateForm}
      />
    );
  }

  return (
    <div className="space-y-12">
      {noticiasActivas.length > 0 && (
        <NoticiasGrid
          title="Noticias Activas"
          badge={{ label: "Activas", color: "green" }}
          items={noticiasActivas}
          onEdit={handleOpenEditForm}
          onDelete={handleRequestDelete}
        />
      )}

      {noticiasVencidas.length > 0 && (
        <NoticiasGrid
          title="Noticias Vencidas"
          badge={{ label: "Vencidas", color: "red" }}
          items={noticiasVencidas}
          onEdit={handleOpenEditForm}
          onDelete={handleRequestDelete}
        />
      )}
    </div>
  );
};
