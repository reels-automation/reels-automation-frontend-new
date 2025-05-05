import React, { useState } from 'react';
import { AuthFormLayout } from '../../../components/forms/authFormLayout';
import { FormInput } from '../../../components/forms/formInput';
import { FormButton } from '../../../components/forms/formButton';
import { SignInPrompt } from './signInPrompt';
import { AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
  error?: string | null;  // Prop para mostrar errores
}

const RegisterForm = ({ onSubmit, error }: RegisterFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && email && password) {
      onSubmit(username, email, password);
    } else {
      alert("Porfavor llena todo el formulario.");
    }
  };

  return (
    <AuthFormLayout title="Crea tu cuenta">
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
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="Tu email"
          onChange={setEmail}
        />

        <FormInput
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          placeholder="Tu contraseña"
          onChange={setPassword}
        />

        <FormButton>Registrarse</FormButton>

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

        <SignInPrompt />
      </form>
    </AuthFormLayout>
  );
};

export default RegisterForm;
