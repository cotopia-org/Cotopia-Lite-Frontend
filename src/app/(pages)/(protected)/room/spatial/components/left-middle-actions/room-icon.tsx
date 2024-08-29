"use client";

import { useState, useRef, useEffect } from "react";
import { ReactNode } from "react";
import { useRoomSpatialContext } from "../../room-spatial-wrapper";

type Props = {
  children?: ReactNode;
  icon: ReactNode;
};

export default function RoomIcon(props: Props) {
  const { eraserMode } = useRoomSpatialContext();
  const [openDrawMenu, setOpenDrawMenu] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement>(null);

  function toggleDrawMenuHandler() {
    setOpenDrawMenu((prevState) => !prevState);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !eraserMode &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setOpenDrawMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [eraserMode]);

  return (
    <div
      ref={iconRef}
      className={`h-9 w-9 hover:bg-slate-200 transition-all rounded-full p-1 ${
        openDrawMenu && "bg-slate-200"
      } flex justify-center items-center cursor-pointer relative`}
    >
      {props.children && (
        <div
          className={`absolute left-full translate-x-5 mx-3 bg-white p-2 ${
            openDrawMenu ? "flex" : "hidden"
          } gap-2 before:w-0 before:h-0 before:absolute before:border-y-8 before:border-y-transparent before:border-r-8 before:border-r-white before:right-full before:top-1/2 before:-translate-y-1/2`}
        >
          {props.children}
        </div>
      )}

      <span onClick={toggleDrawMenuHandler}>{props.icon}</span>
    </div>
  );
}
