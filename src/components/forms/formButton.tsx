import React from 'react';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
  className?: string;
}

export const FormButton = ({ type = 'submit', children, className }: ButtonProps) => {
  const defaultClasses = "w-full text-gray-900 bg-primary-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer";

  return (
    <button
      type={type}
      className={className ? className : defaultClasses}
    >
      {children}
    </button>
  );
};
