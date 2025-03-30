interface TextBoxVideoProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    name: string;
  }
  
  export const TextBoxVideo: React.FC<TextBoxVideoProps> = ({ value, onChange, placeholder, name }) => {
    return (
      <textarea
        className="w-full p-2 border rounded bg-gray-700 text-white h-32 resize-none"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  