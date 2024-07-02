import CBadge from "@/components/shared-ui/c-badge";
import React from "react";

export default function TabRoomTitle() {
  return (
    <div className='flex flex-row items-center gap-x-2'>
      <span>Room</span>
      <CBadge count={0} size='normal' />
    </div>
  );
}
