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

export const getTrackReferenceId = (
  trackReference: TrackReferenceOrPlaceholder | number
) => {
  if (
    typeof trackReference === "string" ||
    typeof trackReference === "number"
  ) {
    return `${trackReference}`;
  } else if (isTrackReferencePlaceholder(trackReference)) {
    return `${trackReference.participant.identity}_${trackReference.source}_placeholder`;
  } else if (isTrackReference(trackReference)) {
    return `${trackReference.participant.identity}_${trackReference.publication.source}_${trackReference.publication.trackSid}`;
  } else {
    throw new Error(
      `Can't generate a id for the given track reference: ${trackReference}`
    );
  }
};

export const useExcludeShareScreenTrack = (
  tracks: TrackReferenceOrPlaceholder[]
) => {
  let finalTracks = [];
  for (let item of tracks) {
    if (item.source !== Track.Source.ScreenShare) {
      finalTracks.push(item);
    }
  }
  return finalTracks;
};

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
