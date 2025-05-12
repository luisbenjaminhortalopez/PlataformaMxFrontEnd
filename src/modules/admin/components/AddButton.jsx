export const AddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white text-2xl rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg z-50"
  >
    +
  </button>
);