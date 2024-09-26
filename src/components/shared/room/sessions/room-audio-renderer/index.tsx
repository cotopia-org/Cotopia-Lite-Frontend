import { getTrackReferenceId, isLocal } from "@livekit/components-core";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import * as React from "react";
import { AudioTrack } from "./audio-track";
import { useRoomContext } from "../../room-context";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { __VARS } from "@/app/const/vars";
import { doCirclesMeet } from "@/lib/utils";

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

export function RoomAudioRenderer() {
  const { user } = useProfile();

  const { room } = useRoomContext();
  const allParticipants = room?.participants ?? [];

  const updatedMyUser = allParticipants?.find(
    (x) => x?.username === user?.username
  );

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

        let volume = 1;
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
