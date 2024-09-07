import Image from "next/image";
import React from "react";
import { useRoomContext } from "../room-context";

export default function Background() {
  // const [roomBackground, setRoomBackground] = useState("")
  // useEffect(() => {}, [])

  const { room } = useRoomContext();

  return (
    <div
      className='fixed top-0 left-0 w-[3000px] h-[3000px] bg-cover bg-center'
      style={{
        transform: `translateX(-1500px) translateY(-1500px)`,
      }}
    >
      <Image
        fill
        src={room?.background?.url ?? `/assets/backgrounds/bg-sample.webp`}
        alt=''
        className='object-cover object-center'
      />
    </div>
  );
}
