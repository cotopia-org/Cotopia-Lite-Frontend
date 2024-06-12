"use client";

import DraggableComponent from "@/components/shared/draggable";
import ActionsRight from "./actions-right";
import ActionsLeft from "./actions-left";
import MicButton from "./actions-right/mic";
import UserButton from "./actions-left/user";
import {
  isTrackReference,
  ParticipantContext,
  ParticipantTileProps,
  TrackRefContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
  useParticipants,
} from "@livekit/components-react";
import { useMemo } from "react";
import { TrackReferenceType } from "@/types/track-reference";
import isMyParticipant from "@/hooks/livekit/is-my-participant";
import { Participant, Track } from "livekit-client";
import { Mic, MicOff } from "lucide-react";
import DraggableCircle from "./draggable-circle";
import SessionWrapper from "./wrapper";

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
        <DraggableCircle />
      </SpacialParticipantContextIfNeeded>
    </TrackRefContextIfNeeded>
  );
}
