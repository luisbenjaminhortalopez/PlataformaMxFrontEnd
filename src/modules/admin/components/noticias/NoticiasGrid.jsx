import PropTypes from 'prop-types';
import { NoticiaCard } from './';
import { Badge } from '../ui/Badge';

export const NoticiasGrid = ({ title, badge, items, onEdit, onDelete }) => {
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

NoticiasGrid.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      fechaPublicacion: PropTypes.string.isRequired,
      fechaVencimiento: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};