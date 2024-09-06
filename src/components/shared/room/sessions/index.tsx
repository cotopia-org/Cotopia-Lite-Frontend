import UserSession from "@/app/(pages)/(protected)/session";
import { RoomEvent, Track } from "livekit-client";
import SpcialLayout from "./special-layout";
import {
  TrackReferenceOrPlaceholder,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import FullLoading from "../../full-loading";
import { RoomAudioRenderer } from "./room-audio-renderer";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function UserSessions({ children }: Props) {
  const { state } = useRoomContext();

  if (state !== "connected") return <FullLoading />;

  return (
    <>
      {children}
      <RoomAudioRenderer />
    </>
  );
}
