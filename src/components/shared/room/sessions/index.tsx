import { RoomAudioRenderer } from "./room-audio-renderer";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function UserSessions({ children }: Props) {
  // const { state } = useRoomContext();

  // if (state !== "connected") return <FullLoading />;

  return (
    <>
      {children}
      <RoomAudioRenderer />
    </>
  );
}
