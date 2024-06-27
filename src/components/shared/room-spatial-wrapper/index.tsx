"use client";

import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { WorkspaceRoomType } from "@/types/room";

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
  const { data, isLoading } = useApi<FetchDataType<WorkspaceRoomType>>(
    `/rooms/${room_id}`
  );
  const room = !!data ? data?.data : undefined;

  return (
    <RoomWrapper>
      <RoomHolder
        token={token}
        room={room}
        room_id={room_id}
        workspace_id={workspace_id}
      />
    </RoomWrapper>
  );
}
