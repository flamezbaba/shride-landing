// components/SearchInput.tsx
"use client";

import { useDebounce } from "@reactuses/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchText, setSearchText] = useState<any>("");

  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    if (!debouncedText) return;

    handleSearch(debouncedText);
  }, [debouncedText]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    
    replace(`${pathname}?${params.toString()}`);
  }; 

  return (
    <div className="ring-2 ring-gray-300 h-[40px] w-[600px] rounded-md flex items-center gap-2 px-3">
      <BiSearch size={22} />
      <input
        type="text"
        className="flex-1 h-full bg-transparent text-center text-lg px-3 outline-none focus:outline-none placeholder:text-gray-400"
        placeholder="what are you craving ?"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e: any) => setSearchText(e.target.value)}
      />
    </div>
  );
}
