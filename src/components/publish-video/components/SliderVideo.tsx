interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    label: string;
  }
  
  export const SliderVideo: React.FC<SliderProps> = ({ value, onChange, min, max, step, label }) => {
    return (
      <div className="w-full">
        <label className="text-gray-300">{label}</label>
        <div className="flex items-center justify-between">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-gray-300">{value}</span>
        </div>
      </div>
    );
  };
  