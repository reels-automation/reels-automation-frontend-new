interface SelectProps {
    id: string;
    label: string;
    value: string | number;
    options: Array<{ value: string | number; label: string }>;
    onChange: (value: string) => void;
    className?: string;
  }
  
  export const FormSelect = ({
    id,
    label,
    value,
    options,
    onChange,
    className,
  }: SelectProps) => {
    const defaultClasses = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  
    return (
      <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className ? className : defaultClasses}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  