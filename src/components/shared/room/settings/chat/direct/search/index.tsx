import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function Search() {
  const searchInput = useRef<HTMLInputElement>();
  useEffect(() => {
    if (!searchInput?.current) return;
    setTimeout(() => {
      searchInput?.current?.focus();
    }, 10);
  }, [searchInput?.current]);

  return (
    <div className='p-2 rounded-lg bg-black/5 flex flex-row items-center'>
      <CotopiaIconButton variant={"ghost"} className='!bg-transparent'>
        <SearchIcon />
      </CotopiaIconButton>
      <input
        ref={(x) => {
          if (x !== null) searchInput.current = x;
        }}
        type='text'
        className='bg-transparent border-0 w-full outline-0'
        placeholder='Find someone in space'
      />
    </div>
  );
}
