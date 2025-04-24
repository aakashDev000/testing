import React from 'react';

const Container = ({ children, className = '', as = 'div', id = '' }) => {
  const Component = as;
  
  return (
    <Component id={id} className={`container mx-auto px-2 md:px-4 lg:px-6 ${className}`}>
      {children}
    </Component>
  );
};

export default Container;