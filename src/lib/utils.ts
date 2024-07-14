import { mergePropsMain } from "@/components/shared/room/sessions/room-audio-renderer/use-media-track-by-source-or-name/merge-props";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { type ClassValue, clsx } from "clsx";
import { Track } from "livekit-client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const querystring = require("querystring");
const getQueryParams = (obj: object) => querystring.stringify(obj);

export function urlWithQueryParams(url: string, object: any) {
  if (typeof object !== "object") return "";

  if (!url) return "";

  const params = getQueryParams(object);

  return `${url}?${params}`;
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

export const getUserFullname = (user: any) => {
  let fullName = user?.username;

  if (user?.name) fullName = user?.name;

  return fullName;
};

/** @internal */
export function isProp<
  U extends HTMLElement,
  T extends React.HTMLAttributes<U>
>(prop: T | undefined): prop is T {
  return prop !== undefined;
}

/** @internal */
export function mergeProps<
  U extends HTMLElement,
  T extends Array<React.HTMLAttributes<U> | undefined>
>(...props: T) {
  return mergePropsMain(...(props.filter(isProp) as any));
}
