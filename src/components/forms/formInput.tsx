import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // or use any icon library

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FormInput = ({
  id,
  label,
  type,
  value,
  placeholder,
  onChange,
  className,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const defaultClasses =
    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

  return (
    <div className="relative">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className ? className : defaultClasses}
        placeholder={placeholder}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};
