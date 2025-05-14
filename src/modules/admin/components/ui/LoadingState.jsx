import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
      <p className="text-gray-400 text-lg">{message || 'Cargando...'}</p>
    </div>
  );
};

LoadingState.propTypes = {
  message: PropTypes.string
};