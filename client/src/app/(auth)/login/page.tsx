"use client";

import Link from "next/link";
import AuthButton from "../_components/UI/AuthButton";
import Container from "../_components/UI/Container";
import React from "react";
import Divider from "../_components/UI/Divider";
import { useRouter } from "next/navigation";
import AuthInput from "../_components/AuthForm/AuthInput";

function LogIn() {
  const router = useRouter();

  const submitHandler = () => {};

  return (
    <form
      className="my-0 md:my-8 flex flex-col items-center"
      onSubmit={submitHandler}
    >
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

        <div className="w-full md:w-[336px]">
          <AuthInput id="email" type="email" label="Email or username" />
          <AuthInput id="password" type="password" label="Password" />
        </div>

        <AuthButton
          onClick={() => {
            router.push("/");
          }}
          className="
                    px-36
                    py-3
                    md:w-fit
                    md:mx-4
                    mt-8
                    mb-8
                "
        >
          Log In
        </AuthButton>
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
        This site is protected by reCAPTCHA and the Google{" "}
        <Link className="underline" href="/">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link className="underline" href="./">
          Terms of Service
        </Link>{" "}
        apply.
      </div>
    </form>
  );
}

export default LogIn;
