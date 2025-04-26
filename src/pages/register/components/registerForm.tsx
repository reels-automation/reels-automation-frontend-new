import React, { useState, useEffect } from 'react';
import { AuthFormLayout } from '../../../components/auth_forms/authFormLayout';
import { AuthInput } from '../../../components/auth_forms/authInput';
import { AuthButton } from '../../../components/auth_forms/authButton';
import { SignInPrompt } from './signInPrompt';

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && email && password) {
      onSubmit(username, email, password);
    } else {
      alert("Fill all the fields.");
    }
  };

  /*
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  */

  return (
    <AuthFormLayout title="Create an account">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <AuthInput
          id="username"
          label="Username"
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={setUsername}
        />

        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={setEmail}
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={setPassword}
        />

        <AuthButton>Sign Up</AuthButton>
        <SignInPrompt />
      </form>
    </AuthFormLayout>
  );
};

export default RegisterForm;