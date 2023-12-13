'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { userContext } from '@/context/UserContext';
import useLogout from '@/hooks/auth/useLogout';
import Link from 'next/link';
import { useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import Button from './Button';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { isLogin } = useContext(userContext);
  const { trigger } = useLogout();

  return (
    <div
      className={twMerge(
        `
    h-fit
    bg-gradient-to-b
    from-emerald-800
    p-6
  `,
        className
      )}
    >
      <div
        className="
        w-full
        flex
        items-center
        justify-between
      "
      >
        <div
          className="
            hidden
            md:flex
            gap-x-2
            items-center
        "
        >
          <button
            onClick={() => router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
          <div className="md:w-fit lg:w-80">{children}</div>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
                rounded-full
                p-2
                bg-white
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
                rounded-full
                p-2
                bg-white
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
          {children}
        </div>
        <div
          className="
                flex
                justify-center
                items-center
                gap-x-4
                
            "
        >
          {isLogin ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={() => trigger()} className="bg-white px-6 py-2 hover:scale-110">
                Logout
              </Button>
              <Button className="bg-white hover:scale-110 px-4 py-2">
                <Link href={'/signup'} prefetch className="block w-max">
                  Sign up
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="
                 bg-transparent
                 text-neutral-300
                 hover:scale-110
                 hover:text-white
               "
                >
                  <Link href={'/signup'} prefetch className="block w-max">
                    Sign up
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  className="
                    bg-white
                    px-3
                    md:px-8
                    py-2
                    hover:scale-110
                "
                >
                  <Link href={'/login'} prefetch>
                    Login
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
