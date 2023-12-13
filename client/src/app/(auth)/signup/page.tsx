import Link from 'next/link';
import Container from '../_components/UI/Container';
import Divider from '../_components/UI/Divider';
import SignUpForm from '../_contents/SignUpForm';

function SignUp() {
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
          Sign up to Melodify
        </h1>

        <SignUpForm />
        <div className="w-full flex flex-col items-center">
          <Divider className="hidden md:flex" />
          <div className="text-neutral-400 font-semibold my-3 md:my-0">
            Already have an account?
            <Link
              className="text-base text-white text-decoration-line: underline font-semibold hover:text-green-500 pl-2 transition"
              href="/login"
              prefetch
            >
              Log in for Melodify
            </Link>
          </div>
        </div>
      </Container>
      <div className="my-8 mx-4 md:mx-0 text-xs font-normal text-neutral-400 text-center">
        This site is protected by reCAPTCHA and the Google{' '}
        <Link className="underline" href="/" prefetch>
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link className="underline" href="/" prefetch>
          Terms of Service
        </Link>{' '}
        apply.
      </div>
    </div>
  );
}

export default SignUp;
