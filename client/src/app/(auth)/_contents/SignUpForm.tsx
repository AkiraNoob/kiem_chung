'use client';
import useRegister from '@/hooks/auth/useRegister';
import { FormEvent, useState } from 'react';
import AuthInput from '../_components/AuthForm/AuthInput';
import AuthButton from '../_components/UI/AuthButton';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const { trigger } = useRegister();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === confirmPassword)
      trigger({
        fullName,
        email,
        password,
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="w-full md:w-[336px] mx-auto">
        <AuthInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          type="text"
          label="Fullname"
        />
        <AuthInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" label="Email" />
        <AuthInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          label="Password"
        />
        <AuthInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirm_password"
          type="password"
          label="Confirm password"
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
        Sign Up
      </AuthButton>
    </form>
  );
};

export default SignUpForm;
