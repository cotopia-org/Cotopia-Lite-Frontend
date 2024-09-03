"use client";

import {
  ParticipantContext,
  ParticipantTileProps,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
  useTrackRefContext,
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

const SessionContext = createContext<{
  track?: TrackReferenceType;
  draggable: boolean;
}>({
  track: undefined,
  draggable: false,
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

type Props = {
  participant?: Participant;
  track?: TrackReferenceOrPlaceholder;
  draggable?: boolean;
  isDragging?: boolean;
};
export default function UserSession({
  participant,
  track,
  draggable = false,
  isDragging = false,
}: Props) {
  const trackRef = track ? track : useTrackRefContext();

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
        participant={participant ?? trackReference.participant}
      >
        <SessionContext.Provider value={{ track: trackReference, draggable }}>
          <DraggableCircle defaultIsDragging={isDragging} />
        </SessionContext.Provider>
      </SpacialParticipantContextIfNeeded>
    </TrackRefContextIfNeeded>
  );
}
