'use client';
import useLogin from '@/hooks/auth/useLogin';
import { FormEvent, useState } from 'react';
import AuthInput from '../_components/AuthForm/AuthInput';
import AuthButton from '../_components/UI/AuthButton';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { trigger } = useLogin();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    trigger({
      email,
      password,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="w-full md:w-[336px] mx-auto">
        <AuthInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" label="Email" />
        <AuthInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          label="Password"
        />
      </div>

      <AuthButton
        type="submit"
        className="
                    px-36
                    py-3
                    md:w-fit
                    md:mx-4
                    mt-8
                "
      >
        Login
      </AuthButton>
    </form>
  );
};

export default LoginForm;
