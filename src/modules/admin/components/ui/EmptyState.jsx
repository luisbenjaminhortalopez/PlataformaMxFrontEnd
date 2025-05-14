import PropTypes from 'prop-types';
import { ImageOff, Plus } from 'lucide-react';

export const EmptyState = ({ title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-zinc-800/50 rounded-lg border border-gray-800">
      <div className="bg-zinc-700/50 p-4 rounded-full mb-4">
        <ImageOff className="h-10 w-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-medium text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-400 max-w-md mb-6">
        {message}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          <Plus size={18} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func
};