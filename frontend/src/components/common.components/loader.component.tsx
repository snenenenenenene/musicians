import React from 'react';

export const Loader = () => {
  return (
    <div className="flex w-full h-48 items-center justify-center space-x-2 animate-pulse">
      <div className="w-4 h-4 bg-main-dark-1 dark:bg-main-1 animate-bounce rounded-full"></div>
      <div className="w-4 h-4 bg-main-dark-1 dark:bg-main-1  animate-bounce200 rounded-full"></div>
      <div className="w-4 h-4 bg-main-dark-1 dark:bg-main-1 animate-bounce400 rounded-full"></div>
    </div>
  );
};
