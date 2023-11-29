"use client";

import qs from "query-string";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <input
      className="
      w-full
    lg:w-full 
    rounded-full 
    bg-neutral-700
    border
    border-transparent
    px-3 
    py-3 
    text-sm 
    placeholder:text-neutral-400 
    disabled:cursor-not-allowed 
    disabled:opacity-50
    focus:border-white
    hover:border-gray-500"
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
