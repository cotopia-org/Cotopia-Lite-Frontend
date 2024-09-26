"use client";

import { useState, useRef } from "react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  icon: ReactNode;
  hover?: boolean;
};

export default function RoomIcon(props: Props) {
  const [openDrawMenu, setOpenDrawMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleDrawMenuHandler = () => {
    setOpenDrawMenu(prevState => !prevState);
  };

  return (
    <div
      className={`h-9 w-9 hover:bg-slate-200 transition-all rounded-full p-1 ${openDrawMenu && props.hover? "scale-110 bg-slate-200" : "scale-100"} flex justify-center items-center cursor-pointer relative`}
      ref={menuRef}
    >
      {props.children && (
        <div className={`absolute left-full translate-x-5 mx-3 bg-white p-2 ${openDrawMenu ? "flex" : "hidden"} gap-2 before:w-0 before:h-0 before:absolute before:border-y-8 before:border-y-transparent before:border-r-8 before:border-r-white before:right-full before:top-1/2 before:-translate-y-1/2`}>
          {props.children}
        </div>
      )}
      <span onClick={toggleDrawMenuHandler}>
        {props.icon}
      </span>
    </div>
  );
}
