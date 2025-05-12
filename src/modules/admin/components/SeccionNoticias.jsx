import { NewsCard } from "./";

export const SeccionNoticias = ({ titulo, noticias, onEdit, onDelete, className = "" }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">{titulo}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {noticias.map((noticia) => (
          <NewsCard
            key={noticia.id}
            {...noticia}
            onEdit={() => onEdit(noticia)}
            onDelete={() => onDelete(noticia.id)}
          />
        ))}
      </div>
    </div>
  );
};