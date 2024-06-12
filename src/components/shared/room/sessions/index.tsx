import UserSession from "@/app/(pages)/room/components/session";
import {
  LocalParticipant,
  RemoteParticipant,
  RoomEvent,
  Track,
} from "livekit-client";
import SpcialLayout from "./special-layout";
import {
  useParticipants,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import FullLoading from "../../full-loading";

export default function UserSessions() {
  const { state } = useRoomContext();

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const participants = useParticipants();

  if (state !== "connected") return <FullLoading />;

  return (
    <SpcialLayout tracks={tracks}>
      <>
        <UserSession />
      </>
    </SpcialLayout>
  );
}
