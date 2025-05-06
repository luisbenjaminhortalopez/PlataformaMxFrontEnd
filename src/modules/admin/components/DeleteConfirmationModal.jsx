export const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        <div className="bg-black text-white p-6 rounded shadow-lg w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">¿Eliminar Noticia?</h2>
  
          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Eliminar
            </button>
            <button
              onClick={onCancel}
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };
  