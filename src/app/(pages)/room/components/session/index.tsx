"use client";

import {
  ParticipantContext,
  ParticipantTileProps,
  TrackRefContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
} from "@livekit/components-react";
import { createContext, useContext, useMemo } from "react";
import { TrackReferenceType } from "@/types/track-reference";
import { Participant, Track } from "livekit-client";
import DraggableCircle from "./draggable-circle";

function SpacialParticipantContextIfNeeded(
  props: React.PropsWithChildren<{
    participant?: Participant;
  }>
) {
  const hasContext = !!useMaybeParticipantContext();

  return props.participant && !hasContext ? (
    <ParticipantContext.Provider value={props.participant}>
      {props.children}
    </ParticipantContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

const SessionContext = createContext<{ track?: TrackReferenceType }>({
  track: undefined,
});

export const useUserTile = () => useContext(SessionContext);

function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceType;
  }>
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef as any}>
      {props.children}
    </TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

type Props = ParticipantTileProps;
export default function UserSession({ trackRef }: Props) {
  const maybeTrackRef = useMaybeTrackRefContext();

  const trackReference: TrackReferenceType = useMemo(() => {
    let latestTrack = {
      participant: trackRef?.participant ?? maybeTrackRef?.participant,
      source: trackRef?.source ?? maybeTrackRef?.source,
      publication: trackRef?.publication ?? maybeTrackRef?.publication,
    };

    return latestTrack;
  }, [maybeTrackRef, trackRef]);

  return (
    <TrackRefContextIfNeeded trackRef={trackReference}>
      <SpacialParticipantContextIfNeeded
        participant={trackReference.participant}
      >
        <SessionContext.Provider value={{ track: trackReference }}>
          <DraggableCircle />
        </SessionContext.Provider>
      </SpacialParticipantContextIfNeeded>
    </TrackRefContextIfNeeded>
  );
}
