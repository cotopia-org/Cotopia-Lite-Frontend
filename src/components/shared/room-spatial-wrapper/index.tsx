"use client";

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";
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

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    if (!room_id) return;

    socket.on("joined", () => {
      socket.emit("joinedRoom", room_id);
    });

    socket.on("joinedInRoom", () => {
      axiosInstance
        .get<FetchDataType<WorkspaceRoomType>>(`/rooms/${room_id}/join`)
        .then(() => {
          axiosInstance
            .get<FetchDataType<WorkspaceRoomType>>(`/rooms/${room_id}`)
            .then((res) => {
              setRoom(res?.data?.data);
            });
        });
    });

    return () => {
      socket.off("joined");
      socket.off("joinedInRoom");
    };
  }, [socket, room_id]);

  return (
    <div className='overflow-hidden max-h-screen'>
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
