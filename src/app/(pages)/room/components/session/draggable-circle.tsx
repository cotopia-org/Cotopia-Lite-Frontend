"use client";

import DraggableComponent from "@/components/shared/draggable";
import React, { ReactNode, useRef, VideoHTMLAttributes } from "react";
import ActionsRight from "./actions-right";
import MicButton from "./actions-right/mic";
import ActionsLeft from "./actions-left";
import UserButton from "./actions-left/user";
import {
  AudioTrack,
  ConnectionQualityIndicator,
  FocusToggle,
  isTrackReference,
  LockLockedIcon,
  ParticipantContext,
  ParticipantName,
  ParticipantPlaceholder,
  ParticipantTileProps,
  PinState,
  TrackMutedIndicator,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useEnsureTrackRef,
  useFeatureContext,
  useIsEncrypted,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
  useParticipantTile,
  VideoTrack,
} from "@livekit/components-react";
import { Participant, Track, TrackPublication } from "livekit-client";
import { isTrackReferencePlaceholder } from "@livekit/components-core";
import { ScreenShareIcon } from "lucide-react";

function ParticipantContextIfNeeded(
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

function isTrackReferencePinned(
  trackReference: TrackReferenceOrPlaceholder,
  pinState: PinState | undefined
): boolean {
  if (typeof pinState === "undefined") {
    return false;
  }
  if (isTrackReference(trackReference)) {
    return pinState.some(
      (pinnedTrackReference) =>
        pinnedTrackReference.participant.identity ===
          trackReference.participant.identity &&
        isTrackReference(pinnedTrackReference) &&
        pinnedTrackReference.publication.trackSid ===
          trackReference.publication.trackSid
    );
  } else if (isTrackReferencePlaceholder(trackReference)) {
    return pinState.some(
      (pinnedTrackReference) =>
        pinnedTrackReference.participant.identity ===
          trackReference.participant.identity &&
        isTrackReferencePlaceholder(pinnedTrackReference) &&
        pinnedTrackReference.source === trackReference.source
    );
  } else {
    return false;
  }
}

function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>
      {props.children}
    </TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

const ParticipantTile = React.forwardRef<HTMLDivElement, ParticipantTileProps>(
  function ParticipantTile(
    {
      trackRef,
      children,
      onParticipantClick,
      disableSpeakingIndicator,
      ...htmlProps
    }: ParticipantTileProps,
    ref
  ) {
    const trackReference = useEnsureTrackRef(trackRef);

    const { elementProps } = useParticipantTile<HTMLDivElement>({
      htmlProps,
      disableSpeakingIndicator,
      onParticipantClick,
      trackRef: trackReference,
    });
    const isEncrypted = useIsEncrypted(trackReference.participant);
    const layoutContext = useMaybeLayoutContext();

    const autoManageSubscription = useFeatureContext()?.autoSubscription;

    const handleSubscribe = React.useCallback(
      (subscribed: boolean) => {
        if (
          trackReference.source &&
          !subscribed &&
          layoutContext &&
          layoutContext.pin.dispatch &&
          isTrackReferencePinned(trackReference, layoutContext.pin.state)
        ) {
          layoutContext.pin.dispatch({ msg: "clear_pin" });
        }
      },
      [trackReference, layoutContext]
    );

    return (
      <div className='relative rounded-full bg-primary w-[96px] h-[96px] flex flex-col items-center justify-center'>
        <div className='w-[86px] h-[86px] bg-white rounded-full flex flex-col items-center justify-center'>
          <div className='w-[82px] h-[82px] rounded-full bg-black [&_video]:w-full [&>div]:h-full  [&_video]:rounded-full [&_video]:object-center [&_video]:h-full [&_video]:object-cover'>
            <div ref={ref} style={{ position: "relative" }} {...elementProps}>
              <TrackRefContextIfNeeded trackRef={trackReference}>
                <ParticipantContextIfNeeded
                  participant={trackReference.participant}
                >
                  {children ?? (
                    <>
                      {isTrackReference(trackReference) &&
                      (trackReference.publication?.kind === "video" ||
                        trackReference.source === Track.Source.Camera ||
                        trackReference.source === Track.Source.ScreenShare) ? (
                        <VideoTrack
                          trackRef={trackReference}
                          onSubscriptionStatusChanged={handleSubscribe}
                          manageSubscription={autoManageSubscription}
                        />
                      ) : (
                        isTrackReference(trackReference) && (
                          <AudioTrack
                            trackRef={trackReference}
                            onSubscriptionStatusChanged={handleSubscribe}
                          />
                        )
                      )}
                      <TrackMutedIndicator
                        trackRef={{
                          participant: trackReference.participant,
                          source: Track.Source.Microphone,
                        }}
                        show={"muted"}
                      ></TrackMutedIndicator>
                      {/* <div className='lk-participant-placeholder'>
                  <ParticipantPlaceholder />
                </div>
                <div className='lk-participant-metadata'>
                  <div className='lk-participant-metadata-item'>
                    {trackReference.source === Track.Source.Camera ? (
                      <>
                        {isEncrypted && (
                          <LockLockedIcon style={{ marginRight: "0.25rem" }} />
                        )}
                        <TrackMutedIndicator
                          trackRef={{
                            participant: trackReference.participant,
                            source: Track.Source.Microphone,
                          }}
                          show={"muted"}
                        ></TrackMutedIndicator>
                        <ParticipantName />
                      </>
                    ) : (
                      <>
                        <ScreenShareIcon style={{ marginRight: "0.25rem" }} />
                        <ParticipantName>&apos;s screen</ParticipantName>
                      </>
                    )}
                  </div>
                  <ConnectionQualityIndicator className='lk-participant-metadata-item' />
                </div> */}
                    </>
                  )}
                  {/* <FocusToggle trackRef={trackReference} /> */}
                </ParticipantContextIfNeeded>
              </TrackRefContextIfNeeded>
            </div>
          </div>
        </div>
        <ActionsRight>
          <MicButton
            trackRef={{
              participant: trackReference.participant,
              source: Track.Source.Microphone,
            }}
          />
        </ActionsRight>
        <ActionsLeft>
          <UserButton />
        </ActionsLeft>
      </div>
    );
  }
);

export default function DraggableCircle() {
  return (
    <DraggableComponent>
      <ParticipantTile />
    </DraggableComponent>
  );
}
