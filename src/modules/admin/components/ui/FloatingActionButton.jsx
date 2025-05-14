import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';

export const FloatingActionButton = ({ onClick, label, icon }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white py-3 pl-4 pr-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl"
        title={label}
      >
        <span className="bg-zinc-800 rounded-full p-1 group-hover:bg-zinc-700 transition-colors">
          {icon || <Plus size={20} />}
        </span>
        <span className="font-medium">{label}</span>
      </button>
    </div>
  );
};

FloatingActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node
};