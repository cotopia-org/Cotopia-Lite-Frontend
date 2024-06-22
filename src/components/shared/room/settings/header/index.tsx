import React from "react";
import HeaderTitle from "./title";

export default function Header() {
  const ROOM_TITLE = "Cotopia Lite";

  return (
    <div className='flex flex-row items-center justify-between'>
      <HeaderTitle title={ROOM_TITLE} />
    </div>
  );
}
