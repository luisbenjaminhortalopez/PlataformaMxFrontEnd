import PropTypes from 'prop-types';

export const Badge = ({ label, color, className }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500/20 text-green-400 border-green-600/30';
      case 'red':
        return 'bg-red-500/20 text-red-400 border-red-600/30';
      case 'blue':
        return 'bg-blue-500/20 text-blue-400 border-blue-600/30';
      case 'yellow':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-600/30';
      case 'purple':
        return 'bg-purple-500/20 text-purple-400 border-purple-600/30';
      case 'gray':
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
    }
  };

  return (
    <span className={`
      text-xs px-2 py-1 rounded 
      border
      font-medium
      ${getColorClasses()}
      ${className || ''}
    `}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['green', 'red', 'blue', 'yellow', 'purple', 'gray']),
  className: PropTypes.string
};

Badge.defaultProps = {
  color: 'gray'
};