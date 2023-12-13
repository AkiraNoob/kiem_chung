'use client';
import React, { ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string;
  id: string;
  label: string;
  type: string;
}

const AuthInput: React.FC<InputProps> = ({ className, id, label, type, ...inputProps }) => {
  return (
    <>
      <label
        className="
            block
            text-white
            text-sm
            font-semibold
            mt-4
            mb-2
        "
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={`
            w-full
            rounded
            bg-neutral-800
            border
            border-neutral-700
            px-3
            py-3
            text-white
            font-semibold
            hover:border-white
            focus:border-[3.5px]
            focus:border-white
            outline-none
            transition
            ${className}
        `}
        id={id}
        type={type}
        placeholder={label}
      />
    </>
  );
};

export default AuthInput;
