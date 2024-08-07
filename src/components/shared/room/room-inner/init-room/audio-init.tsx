import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useEffect } from "react";
import { useRoomContext } from "../../room-context";

export default function AudioInit() {
  const { audioState } = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const audioTrack = localParticipant.getTrackPublication(
    Track.Source.Microphone
  );

  const track = audioTrack?.track;

  useEffect(() => {
    if (!track) {
      return;
    }

    if (audioState === true) {
      track.unmute();
    } else {
      track.mute();
    }
  }, [audioState, track]);

  return null;
}
