import React from "react";
import { useRoomContext } from "../../room/room-context";

export default function BackgroundNode() {
  const { room } = useRoomContext();

  return (
    <div
      className='flex flex-col pointer-events-none z-0'
      style={{
        width: 3840,
        height: 2160,
        backgroundImage: `url(${room?.background?.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
