import React from 'react';

interface AuthButtonProps {
  type?: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
}

export const AuthButton = ({ type = 'submit', children }: AuthButtonProps) => (
  <button
    type={type}
    className="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
  >
    {children}
  </button>
);