import { Eclipse } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Select Room",
};
export default function SelectRoomPage() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <Link
        href={`/room/spatial`}
        className='w-[240px] max-w-full hover:bg-black/[.01] flex flex-col gap-y-4 justify-center items-center border border-black/10 rounded-xl min-h-[300px]'
      >
        <Eclipse size={32} />
        <strong>Spatial Chat</strong>
      </Link>
    </div>
  );
}
