import React from 'react';

const MyContainer = ({ children }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default MyContainer;
