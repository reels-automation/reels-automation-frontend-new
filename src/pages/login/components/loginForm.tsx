import React, { useState } from 'react';
import { AuthFormLayout } from '../../../components/forms/authFormLayout';
import { FormInput } from '../../../components/forms/formInput';
import { FormButton } from '../../../components/forms/formButton';
import { SignUpPrompt } from './signUpPrompt';
import { AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  error: string | null; // Recibimos un error como string (o null si no hay error)
}

const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && password) {
      onSubmit(username, password);
    } else {
      alert("Ingresa el usuario y la contraseña.");
    }
  };

  return (
    <AuthFormLayout title="Inicia sesión en tu cuenta">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <FormInput
          id="username"
          label="Nombre de usuario"
          type="text"
          value={username}
          placeholder="Tu nombre de usuario"
          onChange={setUsername}
        />

        <FormInput
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          placeholder="Tu contraseña"
          onChange={setPassword}
        />

        <FormButton>Iniciar Sesión</FormButton>

        {error && (
          <div className="mt-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <SignUpPrompt />
      </form>
    </AuthFormLayout>
  );
};

export default LoginForm;
