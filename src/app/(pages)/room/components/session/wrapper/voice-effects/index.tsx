import React from "react";
import Ping from "./ping";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function VoiceEffects() {
  const tracks = useTracks(
    [{ source: Track.Source.Microphone, withPlaceholder: true }],
    { onlySubscribed: false }
  );

  return (
    <>
      <Ping />
    </>
  );
}
