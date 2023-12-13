'use client';

import Link from 'next/link';
import Container from '../_components/UI/Container';
import Divider from '../_components/UI/Divider';
import LoginForm from '../_contents/LoginForm';

function LogIn() {
  return (
    <div className="my-0 md:my-8 flex flex-col items-center">
      <Container className="w-full md:w-[734px] md:rounded-lg py-4 md:py-16 px-8 md:px-0 flex flex-col items-start md:items-center">
        <h1
          className="
            text-white
            text-3xl
            md:text-5xl
            font-bold
            mb-4
          "
        >
          Log in to Melodify
        </h1>

        <LoginForm />
        <div className="w-full flex flex-col items-center">
          <Link
            className="text-base text-white text-decoration-line: underline font-semibold hover:text-green-500 transition"
            href="/"
          >
            Forgot your password?
          </Link>
          <Divider className="hidden md:flex" />
          <div className="text-neutral-400 font-semibold my-3 md:my-0">
            Don&apos;t have an account?
            <Link
              className="text-base text-white text-decoration-line: underline font-semibold hover:text-green-500 pl-2 transition"
              href="/signup"
            >
              Sign up for Melodify
            </Link>
          </div>
        </div>
      </Container>
      <div className="my-8 mx-4 md:mx-0 text-xs font-normal text-neutral-400 text-center">
        This site is protected by reCAPTCHA and the Google{' '}
        <Link className="underline" href="/">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link className="underline" href="./">
          Terms of Service
        </Link>{' '}
        apply.
      </div>
    </div>
  );
}

export default LogIn;
