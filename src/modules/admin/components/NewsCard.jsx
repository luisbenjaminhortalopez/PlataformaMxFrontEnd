import { OptionsMenu } from "./OptionsMenu";

export const NewsCard = ({ image, title, onEdit, onDelete }) => {
  return (
    <div className="border border-black rounded p-4 mb-6 relative flex gap-4 items-start">
      <img
        src={image}
        alt="Noticia"
        className="w-32 h-32 object-cover rounded"
      />

      <div className="flex-1">
        <p className="text-lg">{title}</p>
      </div>

      <OptionsMenu onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
