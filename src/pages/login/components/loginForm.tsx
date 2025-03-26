import React, { useState, useEffect } from 'react';
import { AuthFormLayout } from '../../../components/auth_forms/authFormLayout';
import { AuthInput } from '../../../components/auth_forms/authInput';
import { AuthButton } from '../../../components/auth_forms/authButton';
import { SignUpPrompt } from './signUpPrompt';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && password) {
      onSubmit(username, password);
    } else {
      alert("Please enter both username and password.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AuthFormLayout title="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <AuthInput
          id="username"
          label="Username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={setUsername}
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={setPassword}
        />

        <AuthButton>Sign In</AuthButton>
        
        <SignUpPrompt />
      </form>
    </AuthFormLayout>
  );
};

export default LoginForm;