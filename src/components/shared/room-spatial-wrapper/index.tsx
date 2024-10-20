"use client";

import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";
import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/use-query-params";

type Props = {
  token: string; //Currently we are using livekit, so livekit token
  workspace_id: string;
  room_id: number;
};
export default function RoomSpatialWrapper({
  token,
  workspace_id,
  room_id,
}: Props) {
  const { query } = useQueryParams();

  const [isSwitching, setIsSwitching] = useState(false);
  useEffect(() => {
    if (query?.isSwitching) {
      setIsSwitching(true);
    }
  }, [query?.isSwitching]);

  return (
    <div className='max-h-screen'>
      <RoomWrapper>
        <RoomHolder
          token={token}
          room_id={room_id}
          workspace_id={workspace_id}
          isSwitching={isSwitching}
        />
      </RoomWrapper>
    </div>
  );
}
