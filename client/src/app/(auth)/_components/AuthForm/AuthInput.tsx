import React from "react";

interface InputProps {
  className?: string;
  id: string;
  label: string;
  type: string;
}

const AuthInput: React.FC<InputProps> = ({ className, id, label, type }) => {
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
        className="
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
        "
        id={id}
        type={type}
        placeholder={label}
      />
    </>
  );
};

export default AuthInput;
