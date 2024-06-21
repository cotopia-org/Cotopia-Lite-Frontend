"use client";

import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";

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
  return (
    <RoomWrapper>
      <RoomHolder token={token} room_id={room_id} workspace_id={workspace_id} />
    </RoomWrapper>
  );
}
