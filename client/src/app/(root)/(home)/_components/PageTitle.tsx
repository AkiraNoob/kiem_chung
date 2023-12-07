import Link from "next/link";
import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <Link
        className="text-white text-2xl font-semibold hover:underline"
        href="/"
      >
        {title}
      </Link>

      <Link className="font-semibold text-neutral-400 hover:underline" href="/">
        Show all
      </Link>
    </div>
  );
};

export default PageTitle;
