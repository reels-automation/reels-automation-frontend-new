import React, { useState, useEffect } from 'react';
import { AuthFormLayout } from '../../../components/forms/authFormLayout';
import { FormInput } from '../../../components/forms/formInput';
import { FormButton } from '../../../components/forms/formButton';
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

  /*
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  */

  return (
    <AuthFormLayout title="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <FormInput
          id="username"
          label="Username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={setUsername}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={setPassword}
        />

        <FormButton>Sign In</FormButton>
        
        <SignUpPrompt />
      </form>
    </AuthFormLayout>
  );
};

export default LoginForm;