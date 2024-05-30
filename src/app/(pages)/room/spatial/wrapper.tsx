"use client";

import RoomHolder from "@/components/shared/room";

type Props = {
  token: string; //Currently we are using livekit, so livekit token
};
export default function RoomSpatialWrapper({ token }: Props) {
  return <RoomHolder token={token} />;
}
