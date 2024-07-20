import Image from "next/image";
import React from "react";
import { useRoomContext } from "../room-context";

export default function Background() {
  const { room } = useRoomContext();

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-cover bg-center'>
      <Image
        fill
        src={room?.background?.url ?? `/assets/backgrounds/bg-sample.webp`}
        alt=''
        className='object-cover object-center'
      />
    </div>
  );
}
