"use client";

import UserSession from "@/app/(pages)/room/components/session";
import Background from "./backgrounds/background";
import MenuButton from "./components/menu";
import Toolbar from "./toolbar";

export default function RoomHolder() {
  return (
    <div className='w-screen h-screen relative flex items-center justify-center'>
      <Background />
      <Toolbar topLeft={<MenuButton />} />
      <UserSession />
    </div>
  );
}
