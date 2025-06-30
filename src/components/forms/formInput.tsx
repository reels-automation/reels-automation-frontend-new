import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  className,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        required={required}
      />
    </div>
  );
};
