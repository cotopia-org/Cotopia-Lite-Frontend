import Logo from "@/components/shared/logo";
import React from "react";
import UserActions from "../user-actions";

export default function Header() {

  return (
    <header className='flex flex-row items-center justify-between p-4'>
      <Logo />
      <UserActions />
    </header>
  );
}