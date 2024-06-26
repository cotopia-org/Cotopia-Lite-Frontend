import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { SearchIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef } from "react";

type Props = {
  onChange: (val: string) => void;
};
export default function Search({ onChange }: Props) {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const searchInput = useRef<HTMLInputElement>();
  useEffect(() => {
    if (!searchInput?.current) return;
    setTimeout(() => {
      searchInput?.current?.focus();
    }, 10);
  }, [searchInput?.current]);

  return (
    <div className='p-4 rounded-lg bg-black/5 flex flex-row gap-x-4 items-center'>
      <SearchIcon className='text-black/40' />
      <input
        ref={(x) => {
          if (x !== null) searchInput.current = x;
        }}
        type='text'
        className='bg-transparent border-0 w-full outline-0'
        placeholder='Find someone in space'
        onChange={handleChangeInput}
      />
    </div>
  );
}
