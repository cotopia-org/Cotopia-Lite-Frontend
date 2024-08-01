import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useEffect } from "react";
import { useRoomContext } from "../../room-context";

export default function VideoInit() {
  const { videoState } = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const voiceTrack = localParticipant.getTrackPublication(Track.Source.Camera);

  const track = voiceTrack?.track;

  useEffect(() => {
    if (!track) {
      return;
    }

    if (videoState === true) {
      track.unmute();
    } else {
      track.mute();
    }
  }, [videoState, track]);

  return null;
}
