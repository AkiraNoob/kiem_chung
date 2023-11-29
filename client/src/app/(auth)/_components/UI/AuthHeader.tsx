import React from "react";
import Image from "next/image";
import logo from "@/../public/images/Melodify.svg";

const AuthHeader = () => {
  return (
    <div className="h-24 bg-black flex justify-start items-center px-4">
      <Image className="w-60" src={logo} alt="Logo" />
    </div>
  );
};

export default AuthHeader;
