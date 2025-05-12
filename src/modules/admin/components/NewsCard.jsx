import { OptionsMenu } from "./OptionsMenu";

export const NewsCard = ({
  image,
  title,
  fechaPublicacion,
  fechaVencimiento,
  onEdit,
  onDelete
}) => {
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const estaVencida = new Date(fechaVencimiento) < new Date();

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white border border-black rounded overflow-hidden shadow-lg mb-6 h-[300px]">
      <img src={image} alt="Noticia" className="w-full h-1/2 object-cover" />

      <div className="h-1/2 flex flex-col justify-center items-center px-4 text-center">
        <p className="text-xl font-semibold mb-2">{title}</p>
        <p className={`text-sm ${estaVencida ? "text-red-500" : "text-gray-600"}`}>
          publicación: {formatDate(fechaPublicacion)} — vencimiento: {formatDate(fechaVencimiento)}
        </p>
      </div>

      <div className="absolute top-2 right-2">
        <OptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};
