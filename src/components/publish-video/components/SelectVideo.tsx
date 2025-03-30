interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    name: string;
  }
  
  export const SelectVideo: React.FC<SelectProps> = ({ value, onChange, options, name }) => {
    return (
      <select
        className="w-full p-2 border rounded bg-gray-700 text-white"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  