import CBadge from "@/components/shared-ui/c-badge";
import React from "react";
import { useRoomContext } from "../../../room-context";

export default function TabRoomTitle() {
  const { room } = useRoomContext();

  return (
    <div className='flex flex-row items-center gap-x-2'>
      <span>Room</span>
      <CBadge count={room?.unseens ?? 0} size='normal' />
    </div>
  );
}
