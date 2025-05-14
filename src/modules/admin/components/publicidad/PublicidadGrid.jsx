import PropTypes from 'prop-types';
import { PublicidadCard } from './';

export const PublicidadGrid = ({ items, onEdit, onDelete }) => {
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

PublicidadGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imagen: PropTypes.string.isRequired,
      nombre_anunciante: PropTypes.string,
      fecha_expiracion: PropTypes.string
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};