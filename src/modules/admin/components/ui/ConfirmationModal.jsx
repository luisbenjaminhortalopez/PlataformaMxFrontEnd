import PropTypes from 'prop-types';

export const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  danger = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div 
        className="bg-zinc-800 text-white p-6 rounded-lg shadow-xl w-full max-w-sm relative z-10 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-xl font-semibold mb-3 ${danger ? 'text-red-400' : ''}`}>
          {title}
        </h2>
        
        <p className="text-gray-300 mb-6">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded font-medium transition-colors ${
              danger 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {confirmLabel}
          </button>
          
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 bg-zinc-700 hover:bg-gray-700 rounded transition-colors"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  danger: PropTypes.bool
};

ConfirmationModal.defaultProps = {
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  danger: false
};