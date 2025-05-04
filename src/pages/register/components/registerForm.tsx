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
      alert("Please fill in all fields.");
    }
  };

  return (
    <AuthFormLayout title="Create an account">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

        <FormInput
          id="username"
          label="Username"
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={setUsername}
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={setEmail}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={setPassword}
        />

        <FormButton>Sign Up</FormButton>

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
