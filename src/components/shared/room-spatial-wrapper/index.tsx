"use client";

import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";
import { useApi } from "@/hooks/swr";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { WorkspaceRoomType } from "@/types/room";
import { useEffect, useState } from "react";

type Props = {
  token: string; //Currently we are using livekit, so livekit token
  workspace_id: string;
  room_id: string;
};
export default function RoomSpatialWrapper({
  token,
  workspace_id,
  room_id,
}: Props) {
  const [room, setRoom] = useState<WorkspaceRoomType>();

  useEffect(() => {
    if (room_id !== undefined) {
      axiosInstance
        .get<FetchDataType<WorkspaceRoomType>>(`/rooms/${room_id}`)
        .then((res) => {
          setRoom(res?.data?.data);
        });
    }
  }, [room_id]);
  return (
    <div className='selection:!bg-transparent overflow-hidden max-h-screen'>
      <RoomWrapper>
        <RoomHolder
          token={token}
          room={room}
          onRoomUpdated={setRoom}
          room_id={room_id}
          workspace_id={workspace_id}
        />
      </RoomWrapper>
    </div>
  );
}
