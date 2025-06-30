import React from 'react';
import { Button } from '@/components/ui/button';

interface FormButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  className,
  type = 'button',
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </Button>
  );
};
