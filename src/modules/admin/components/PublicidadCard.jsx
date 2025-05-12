import { OptionsMenu } from "./OptionsMenu";

export const PublicidadCard = ({ image, onEdit, onDelete }) => {
  return (
    <div className="relative mb-6 max-w-5xl mx-auto">
      <img
        src={image}
        alt="Publicidad"
        className="w-full h-auto rounded shadow object-cover"
        style={{ maxHeight: "220px" }}
      />

      <div className="absolute top-2 right-2">
        <OptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};