import PropTypes from 'prop-types';

export const IconButton = ({ icon, onClick, tooltip, variant, size, className }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30';
      case 'danger':
        return 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30';
      case 'light':
        return 'bg-gray-300/10 hover:bg-gray-300/20 text-gray-300 border-gray-300/20';
      case 'dark':
      default:
        return 'bg-zinc-700 hover:bg-gray-700 text-gray-300 border-zinc-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'lg':
        return 'p-3';
      case 'sm':
        return 'p-1';
      case 'md':
      default:
        return 'p-2';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg border
        flex items-center justify-center
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className || ''}
      `}
      title={tooltip}
      type="button"
    >
      {icon}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'danger', 'light', 'dark']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

IconButton.defaultProps = {
  variant: 'dark',
  size: 'md',
  tooltip: ''
};