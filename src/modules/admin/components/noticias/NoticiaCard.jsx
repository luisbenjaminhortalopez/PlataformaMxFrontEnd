import PropTypes from 'prop-types';
import { Badge, IconButton } from '../ui';
import { PencilIcon, TrashIcon, CalendarIcon } from 'lucide-react';

export const NoticiaCard = ({ 
  image, 
  title, 
  fechaPublicacion, 
  fechaVencimiento, 
  onEdit, 
  onDelete 
}) => {
  const isExpired = fechaVencimiento && new Date(fechaVencimiento) < new Date();
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={`Imagen de ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 flex space-x-2">
          <IconButton 
            icon={<PencilIcon size={16} />}
            onClick={onEdit}
            tooltip="Editar noticia"
          />
          <IconButton 
            icon={<TrashIcon size={16} />}
            onClick={onDelete}
            tooltip="Eliminar noticia"
            variant="danger"
          />
        </div>
        
        {isExpired && (
          <Badge 
            label="Vencida" 
            color="red" 
            className="absolute top-3 left-3"
          />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-white text-lg mb-2 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <CalendarIcon size={14} />
            <span>Publicada: {formatDate(fechaPublicacion)}</span>
          </div>
          
          {fechaVencimiento ? (
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={14} className={isExpired ? "text-red-400" : "text-gray-400"} />
              <span className={isExpired ? "text-red-400" : "text-gray-400"}>
                Vence: {formatDate(fechaVencimiento)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

NoticiaCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fechaPublicacion: PropTypes.string.isRequired,
  fechaVencimiento: PropTypes.string, 
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};