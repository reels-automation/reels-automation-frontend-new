interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    name: string;
  }
  
  export const InputVideo: React.FC<InputProps> = ({ value, onChange, placeholder, name }) => {
    return (
      <input
        className="w-full p-2 border rounded bg-gray-700 text-white"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  