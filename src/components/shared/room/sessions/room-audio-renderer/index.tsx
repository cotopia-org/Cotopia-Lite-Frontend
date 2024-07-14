import { getTrackReferenceId, isLocal } from "@livekit/components-core";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import * as React from "react";
import { AudioTrack } from "./audio-track";
import { UserMinimalType, UserType } from "@/types/user";
import { useRoomContext } from "../../room-context";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";

/** @public */
export interface RoomAudioRendererProps {
  /** Sets the volume for all audio tracks rendered by this component. By default, the range is between `0.0` and `1.0`. */
  volume?: number;
  /**
   * If set to `true`, mutes all audio tracks rendered by the component.
   * @remarks
   * If set to `true`, the server will stop sending audio track data to the client.
   * @alpha
   */
  muted?: boolean;
}

/**
 * The `RoomAudioRenderer` component is a drop-in solution for adding audio to your LiveKit app.
 * It takes care of handling remote participants’ audio tracks and makes sure that microphones and screen share are audible.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <RoomAudioRenderer />
 * </LiveKitRoom>
 * ```
 * @public
 */

const DEFAULT_X = 0;
const DEFAULT_Y = 0;

function doCirclesMeet(circle1?: UserMinimalType, circle2?: UserMinimalType) {
  if (!circle2 || !circle1)
    return {
      distance: undefined,
      meet: false,
      volumePercentage: 0,
    };

  const radius = 46; // radius of each circle
  const radiusHearing = 200;

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

export function RoomAudioRenderer({ volume, muted }: RoomAudioRendererProps) {
  const { user } = useProfile();

  const { room } = useRoomContext();
  const allParticipants = room?.participants ?? [];

  const updatedMyUser = allParticipants?.find(
    (x) => x.username === user.username
  );

  console.log("allParticipants", allParticipants);

  const tracks = useTracks(
    [
      Track.Source.Microphone,
      Track.Source.ScreenShareAudio,
      Track.Source.Unknown,
    ],
    {
      updateOnlyOn: [],
      onlySubscribed: true,
    }
  ).filter(
    (ref) =>
      !isLocal(ref.participant) && ref.publication.kind === Track.Kind.Audio
  );

  console.log("tracks", tracks);

  return (
    <div style={{ display: "none" }}>
      {tracks.map((trackRef) => {
        const trackOwner = allParticipants?.find(
          (x) => x.username === trackRef?.participant?.identity
        );

        const { meet, volumePercentage } = doCirclesMeet(
          updatedMyUser,
          trackOwner
        );

        let volume = volumePercentage;
        let isMuted = !meet;

        return (
          <AudioTrack
            key={getTrackReferenceId(trackRef)}
            trackRef={trackRef}
            volume={volume}
            muted={isMuted}
          />
        );
      })}
    </div>
  );
}
