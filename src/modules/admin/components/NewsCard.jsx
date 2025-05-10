import { OptionsMenu } from "./OptionsMenu";

export const NewsCard = ({ image, title, onEdit, onDelete }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto bg-white border border-black rounded overflow-hidden shadow-lg mb-6 h-[300px]">
      <img
        src={image}
        alt="Noticia"
        className="w-full h-1/2 object-cover"
      />

      <div className="h-1/2 flex items-center justify-center px-4 text-center">
        <p className="text-xl font-semibold">{title}</p>
      </div>

      <div className="absolute top-2 right-2">
        <OptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};
