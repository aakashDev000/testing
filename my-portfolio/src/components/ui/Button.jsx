import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-button hover:shadow-md focus:ring-primary-500 relative overflow-hidden before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white shadow-button hover:shadow-md focus:ring-secondary-500 relative overflow-hidden before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity',
    outline: 'border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 focus:ring-primary-500 hover:shadow-sm',
    ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 focus:ring-primary-500',
    link: 'text-primary-600 dark:text-primary-400 underline-offset-4 hover:underline focus:ring-primary-500'
  };
  
  const sizes = {
    sm: 'text-sm py-2 px-3',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;