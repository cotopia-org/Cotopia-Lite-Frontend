import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useEffect } from "react";
import { useRoomContext } from "../../room-context";
import { useRoomHolder } from "../..";

export default function AudioInit() {
  const { mediaPermissions } = useRoomHolder();

  const { localParticipant } = useLocalParticipant();

  const audioTrack = localParticipant.getTrackPublication(
    Track.Source.Microphone
  );

  const track = audioTrack?.track;

  useEffect(() => {
    if (!track) {
      return;
    }

    if (mediaPermissions?.audio === true) {
      track.unmute();
    } else {
      track.mute();
    }
  }, [mediaPermissions?.audio, track]);

  return null;
}
