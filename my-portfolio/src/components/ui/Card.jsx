import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  as = 'div'
}) => {
  const Component = as;
  
  return (
    <Component 
      className={`
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-800 
        rounded-2xl p-6 
        shadow-card 
        relative
        ${hover ? 'hover:shadow-lg hover:-translate-y-1 after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-gradient-to-r after:from-primary-500 after:to-secondary-500 after:rounded-b-2xl after:opacity-0 after:hover:opacity-100 after:transition-opacity' : ''} 
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Card;