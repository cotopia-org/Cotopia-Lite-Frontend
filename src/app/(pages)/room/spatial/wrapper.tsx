"use client";

import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";

type Props = {
  token: string; //Currently we are using livekit, so livekit token
};
export default function RoomSpatialWrapper({ token }: Props) {
  return (
    <RoomWrapper>
      <RoomHolder token={token} />
    </RoomWrapper>
  );
}
