import {
  isTrackReference,
  isTrackReferencePlaceholder,
} from "@livekit/components-core";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { type ClassValue, clsx } from "clsx";
import { Track } from "livekit-client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isScreenShareExist = (tracks: TrackReferenceOrPlaceholder[]) => {
  let hasShareScreen = false;
  let shareScreenTrack = [];

  for (let track of tracks) {
    if (track.source === Track.Source.ScreenShare) {
      hasShareScreen = true;
      shareScreenTrack.push(track);
    }
  }
  return {
    hasShareScreen,
    shareScreenTrack: shareScreenTrack?.[0] || null,
  };
};
