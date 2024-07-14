import UserSession from "@/app/(pages)/(protected)/session";
import { RoomEvent, Track } from "livekit-client";
import SpcialLayout from "./special-layout";
import { useRoomContext, useTracks } from "@livekit/components-react";
import FullLoading from "../../full-loading";
import { RoomAudioRenderer } from "./room-audio-renderer";

export default function UserSessions() {
  const { state } = useRoomContext();

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    {
      updateOnlyOn: [
        RoomEvent.ActiveSpeakersChanged,
        RoomEvent.Reconnected,
        RoomEvent.Reconnecting,
        RoomEvent.MediaDevicesChanged,
        RoomEvent.LocalTrackPublished,
        RoomEvent.TrackUnsubscribed,
      ],
      onlySubscribed: true,
    }
  );

  if (state !== "connected") return <FullLoading />;

  return (
    <SpcialLayout tracks={tracks}>
      <>
        <UserSession />
        <RoomAudioRenderer />
      </>
    </SpcialLayout>
  );
}
