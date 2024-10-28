import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { Loader } from "lucide-react";
import React from "react";
import Dots from "./dots";

export default function SocketConnectionState() {
  const { socketState } = useProfile();

  if (socketState !== undefined) return;

  return (
    <div className='flex flex-row items-center text-yellow-500 gap-x-2 flex-wrap'>
      <Loader className='animate-spin' size={20} />
      <div className='flex flex-row items-center gap-x-2 text-base'>
        Reconnecting
        <Dots />
      </div>
    </div>
  );
}
