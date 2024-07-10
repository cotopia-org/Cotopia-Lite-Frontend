"use client";

import DraggableComponent from "@/components/shared/draggable";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from "react";
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
  useTrackMutedIndicator,
  VideoTrack,
} from "@livekit/components-react";
import { Participant, Track, TrackPublication } from "livekit-client";
import { isTrackReferencePlaceholder } from "@livekit/components-core";
import { ScreenShareIcon } from "lucide-react";
import SessionWrapper from "./wrapper";
import { useUserTile } from ".";
import { useProfile, useSocket } from "../protected-wrapper";
import { UserMinimalType, UserType } from "@/types/user";
import axiosInstance from "@/lib/axios";
import { useRoomContext } from "@/components/shared/room/room-context";
import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { getUserFullname } from "@/lib/utils";

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

    const livekitIdentity = trackReference.participant?.identity;

    const { isMuted } = useTrackMutedIndicator(trackRef);

    const isSpeaking = trackReference?.participant?.isSpeaking;

    let clss =
      "relative w-full h-full absolute top-0 left-0 rounded-full p-1 [&_video]:object-cover [&_video]:rounded-full [&_video]:h-full [&_video]:w-full w-[96px] h-[96px] flex flex-col items-center justify-center";

    if (isSpeaking) {
      clss += ` bg-green-700`;
    } else {
      clss += ` bg-black/20`;
    }

    const { room } = useRoomContext();
    const participants = room?.participants;

    const targetUser = participants?.find(
      (x) => x.username === livekitIdentity
    );

    const userFullName = getUserFullname(targetUser);

    let trackContent = null;

    if (isTrackReference(trackReference)) {
      //Default state
      trackContent = (
        <AudioTrack
          trackRef={trackReference}
          onSubscriptionStatusChanged={handleSubscribe}
        />
      );

      if (
        trackReference.publication?.kind === "video" &&
        trackReference.source === Track.Source.Camera
      ) {
        trackContent = (
          <VideoTrack
            trackRef={trackReference}
            onSubscriptionStatusChanged={handleSubscribe}
            manageSubscription={autoManageSubscription}
          />
        );
      }

      // if (
      //   trackReference.publication?.kind === "video" &&
      //   trackReference.source === Track.Source.ScreenShare
      // ) {
      //   trackContent = <div>xx</div>;
      // }
    }

    return (
      <div className={clss}>
        <div className='relative w-[86px] h-[86px] rounded-full flex flex-col items-center justify-center'>
          {isMuted && (
            <CotopiaAvatar
              className='absolute top-0 left-0 w-full h-full z-[1]'
              src={targetUser?.avatar?.url ?? ""}
              title={userFullName?.[0] ?? livekitIdentity?.[0]}
            />
          )}
          <div className={``}>
            <div ref={ref} style={{ position: "relative" }} {...elementProps}>
              <TrackRefContextIfNeeded trackRef={trackReference}>
                <ParticipantContextIfNeeded
                  participant={trackReference.participant}
                >
                  {children ?? (
                    <>
                      {trackContent}
                      {/* {isTrackReference(trackReference) &&
                      trackReference.publication?.kind === "video" &&
                      trackReference.source === Track.Source.Camera ? (
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
                      )} */}
                    </>
                  )}
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

const DEFAULT_TILE_POSITION = [0, 0];

export default function DraggableCircle() {
  const { room } = useRoomContext();

  const [participants, setParticipants] = useState<UserMinimalType[]>(
    room ? room?.participants : []
  );
  useEffect(() => {
    setParticipants(room?.participants ?? []);
  }, [room?.participants]);

  const { user } = useProfile();
  const { track } = useUserTile();

  const livekitIdentity = track?.participant?.identity;

  useSocket("userUpdated", (user: UserMinimalType) => {
    if (livekitIdentity === user.username) {
      let userCoordinates = user?.coordinates
        ? user?.coordinates?.split(",")
        : DEFAULT_TILE_POSITION;

      userCoordinates = userCoordinates.map((x) => +x);

      setParticipants((prev) => {
        const prevParticpants = [...(prev ?? [])];

        const participantIds = prev?.map((x) => x.id);

        const foundIndex = participantIds?.findIndex((id) => id === user?.id);

        if (foundIndex !== undefined && foundIndex > -1) {
          prevParticpants[foundIndex] = {
            ...prevParticpants[foundIndex],
            coordinates: user?.coordinates,
          };
        }

        return prevParticpants;
      });
    }
  });

  const handleUpdateCoordinates = (position: { x: number; y: number }) => {
    axiosInstance.post(`/users/updateCoordinates`, {
      coordinates: `${position.x},${position.y}`,
    });
  };

  const isMyUser = user?.username === livekitIdentity;

  const positionUser = participants?.find(
    (x) => x.username === livekitIdentity
  );

  const coordsUser = positionUser?.coordinates?.split(",")?.map((x) => +x) ?? [
    200, 200,
  ]; //200 is default position , change in the feature

  return (
    <DraggableComponent
      onDragEnd={handleUpdateCoordinates}
      disabled={!isMyUser}
      hasTransition={!isMyUser}
      x={coordsUser?.[0]}
      y={coordsUser?.[1]}
    >
      <SessionWrapper>
        <ParticipantTile />
      </SessionWrapper>
    </DraggableComponent>
  );
}
