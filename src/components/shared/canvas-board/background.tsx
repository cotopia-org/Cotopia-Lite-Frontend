import React from "react";
import { useRoomContext } from "../room/room-context";

export default function BackgroundNode() {
  const { room } = useRoomContext();

  return (
    <div
      className='flex flex-col pointer-events-none z-0'
      style={{
        width: 3000,
        height: 3000,
        backgroundColor: "#eee",
        background: `url(${room?.background?.url})`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
