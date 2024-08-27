import { __VARS } from "@/app/const/vars";
import { mergePropsMain } from "@/components/shared/room/sessions/room-audio-renderer/use-media-track-by-source-or-name/merge-props";
import { UserMinimalType } from "@/types/user";
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

export function isProp<
  U extends HTMLElement,
  T extends React.HTMLAttributes<U>
>(prop: T | undefined): prop is T {
  return prop !== undefined;
}

export function mergeProps<
  U extends HTMLElement,
  T extends Array<React.HTMLAttributes<U> | undefined>
>(...props: T) {
  return mergePropsMain(...(props.filter(isProp) as any));
}

const DEFAULT_X = 0;
const DEFAULT_Y = 0;

export function doCirclesMeet(
  circle1?: UserMinimalType,
  circle2?: UserMinimalType
) {
  if (!circle2 || !circle1)
    return {
      distance: undefined,
      meet: false,
      volumePercentage: 0,
    };

  const radius = 46; // radius of each circle
  const radiusHearing = __VARS.voiceAreaRadius - 50;

  const userCoordinate1 = circle1.coordinates?.split(",")?.map((x) => +x) ?? [
    DEFAULT_X,
    DEFAULT_Y,
  ];
  const user1Position = { x: userCoordinate1[0], y: userCoordinate1[1] };
  const userCoordinate2 = circle2.coordinates?.split(",")?.map((x) => +x) ?? [
    DEFAULT_X,
    DEFAULT_Y,
  ];
  const user2Position = { x: userCoordinate2[0], y: userCoordinate2[1] };

  // Calculate the distance between the centers of the circles
  const distance = Math.sqrt(
    Math.pow(user1Position.x - user2Position.x, 2) +
      Math.pow(user1Position.y - user2Position.y, 2) // Fixed y-coordinate difference calculation
  );

  // Check if the distance is less than or equal to the sum of the radii
  const meet = distance <= 2 * radius + radiusHearing;

  const percentage = !meet
    ? 0
    : 100 - Math.min((distance / radiusHearing) * 100, 100);

  return { meet, distance, volumePercentage: percentage };
}

export function convertMinutesToHHMMSS(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes * 60) % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(mins).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function convertCoordinateString(coords: string) {
  if (!coords) return;

  if (!coords.includes(",")) return;

  const coordsObject = coords.split(",");

  return {
    x: coordsObject[0] ? +coordsObject[0] : 0,
    y: coordsObject[1] ? +coordsObject[1] : 0,
  };
}
