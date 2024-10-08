"use client"

import React, { useEffect, useState } from "react"
import ActionsRight from "./actions-right"
import MicButton from "./actions-right/mic"
import {
  AudioTrack,
  isTrackReference,
  ParticipantContext,
  ParticipantTileProps,
  PinState,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useEnsureTrackRef,
  useFeatureContext,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
  useParticipantTile,
  useTrackMutedIndicator,
  VideoTrack,
} from "@livekit/components-react"
import { Participant, Track } from "livekit-client"
import { isTrackReferencePlaceholder } from "@livekit/components-core"
import SessionWrapper from "./wrapper"
import { useUserTile } from "."
import { useProfile, useSocket } from "../protected-wrapper"
import { UserMinimalType } from "@/types/user"
import { useRoomContext } from "@/components/shared/room/room-context"
import CotopiaAvatar from "@/components/shared-ui/c-avatar"
import { doCirclesMeet, getUserFullname } from "@/lib/utils"
import VoiceAreaHearing from "./wrapper/voice-area-hearing"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import DraggableRoom from "@/components/shared/room/components/draggable-room"
import { __VARS } from "@/app/const/vars"

function ParticipantContextIfNeeded(
  props: React.PropsWithChildren<{
    participant?: Participant
  }>
) {
  const hasContext = !!useMaybeParticipantContext()
  return props.participant && !hasContext ? (
    <ParticipantContext.Provider value={props.participant}>
      {props.children}
    </ParticipantContext.Provider>
  ) : (
    <>{props.children}</>
  )
}

function isTrackReferencePinned(
  trackReference: TrackReferenceOrPlaceholder,
  pinState: PinState | undefined
): boolean {
  if (typeof pinState === "undefined") {
    return false
  }
  if (isTrackReference(trackReference)) {
    return pinState.some(
      (pinnedTrackReference) =>
        pinnedTrackReference.participant.identity ===
          trackReference.participant.identity &&
        isTrackReference(pinnedTrackReference) &&
        pinnedTrackReference.publication.trackSid ===
          trackReference.publication.trackSid
    )
  } else if (isTrackReferencePlaceholder(trackReference)) {
    return pinState.some(
      (pinnedTrackReference) =>
        pinnedTrackReference.participant.identity ===
          trackReference.participant.identity &&
        isTrackReferencePlaceholder(pinnedTrackReference) &&
        pinnedTrackReference.source === trackReference.source
    )
  } else {
    return false
  }
}

function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder
  }>
) {
  const hasContext = !!useMaybeTrackRefContext()
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>
      {props.children}
    </TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  )
}

const ParticipantTile = React.forwardRef<
  HTMLDivElement,
  ParticipantTileProps & { isDragging: boolean }
>(function ParticipantTile(
  {
    trackRef,
    children,
    onParticipantClick,
    disableSpeakingIndicator,
    isDragging,
    ...htmlProps
  }: ParticipantTileProps & { isDragging: boolean },
  ref
) {
  const trackReference = useEnsureTrackRef(trackRef)

  const { elementProps } = useParticipantTile<HTMLDivElement>({
    htmlProps,
    disableSpeakingIndicator,
    onParticipantClick,
    trackRef: trackReference,
  })
  const layoutContext = useMaybeLayoutContext()

  const autoManageSubscription = useFeatureContext()?.autoSubscription

  const handleSubscribe = React.useCallback(
    (subscribed: boolean) => {
      if (
        trackReference.source &&
        !subscribed &&
        layoutContext &&
        layoutContext.pin.dispatch &&
        isTrackReferencePinned(trackReference, layoutContext.pin.state)
      ) {
        layoutContext.pin.dispatch({ msg: "clear_pin" })
      }
    },
    [trackReference, layoutContext]
  )

  const livekitIdentity = trackReference.participant?.identity

  const { isMuted } = useTrackMutedIndicator(trackRef)

  const isSpeaking = trackReference?.participant?.isSpeaking

  let clss =
    "relative user-circle transition-all w-full h-full [&_.lk-participant-tile]:!absolute [&_.lk-participant-tile]:w-full [&_.lk-participant-tile]:h-full [&_.lk-participant-tile]:top-0 [&_.lk-participant-tile]:left-0 rounded-full p-1 [&_video]:h-full [&_video]:object-cover [&_video]:rounded-full [&_video]:h-full [&_video]:w-full w-[96px] h-[96px] flex flex-col items-center justify-center"

  const { user } = useProfile()

  const isMyUser = user?.username === livekitIdentity

  const { room, videoState } = useRoomContext()
  const participants = room?.participants

  const updatedMyUser = participants?.find(
    (x) => x?.username === user?.username
  )

  const targetUser = participants?.find((x) => x?.username === livekitIdentity)

  const userFullName = getUserFullname(targetUser)

  let trackContent = null

  if (isTrackReference(trackReference)) {
    //Default state
    trackContent = (
      <AudioTrack
        trackRef={trackReference}
        onSubscriptionStatusChanged={handleSubscribe}
      />
    )

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
      )
    }
  }

  let showAvatar = false

  //I heet the circles? checking
  const { meet } = doCirclesMeet(updatedMyUser, targetUser)

  //Show user avatar if user is muted or isn't in user's area
  showAvatar = !(isMuted || meet) || isMuted || isMyUser

  //Scale down the user profile if user isn't in user's area
  if (!meet) clss += ` scale-[0.6]`

  //Highlight user circle in different states
  if (isSpeaking && meet) {
    clss += ` bg-green-700`
  }

  if (!isSpeaking) {
    clss += ` bg-black/10`
  }

  if (!meet) {
    clss += ` bg-gray-600`
  }

  if (!isMuted && isMyUser) showAvatar = false

  // if (!videoState) showAvatar = true;

  return (
    <CotopiaTooltip title={userFullName}>
      <VoiceAreaHearing isDragging={isDragging} />
      <div className={clss}>
        <div className="relative w-[86px] h-[86px] rounded-full flex flex-col items-center justify-center">
          {showAvatar && (
            <CotopiaAvatar
              className="absolute top-0 left-0 w-full h-full z-[1]"
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
                  {children ?? <>{trackContent}</>}
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
      </div>
    </CotopiaTooltip>
  )
})

const DEFAULT_TILE_POSITION = [0, 0]

export default function DraggableCircle() {
  const socket = useSocket()

  const [isDragging, setIsDragging] = useState(false)
  const handleStartDragging = () => {
    setIsDragging(true)
  }

  const { room, updateUserCoords } = useRoomContext()

  const [participants, setParticipants] = useState<UserMinimalType[]>(
    room ? room?.participants : []
  )
  useEffect(() => {
    setParticipants(room?.participants ?? [])
  }, [room?.participants])

  const { user } = useProfile()
  const { track } = useUserTile()

  const livekitIdentity = track?.participant?.identity

  useSocket("userUpdated", (user: UserMinimalType) => {
    let userCoordinates = user?.coordinates
      ? user?.coordinates?.split(",")
      : DEFAULT_TILE_POSITION

    userCoordinates = userCoordinates.map((x) => +x)

    setParticipants((prev) => {
      const prevParticpants = [...(prev ?? [])]

      const participantIds = prev?.map((x) => x.id)

      const foundIndex = participantIds?.findIndex((id) => id === user?.id)

      if (foundIndex !== undefined && foundIndex > -1) {
        const foundUser = prevParticpants[foundIndex]

        const updatedUser: UserMinimalType = {
          ...foundUser,
          coordinates: user?.coordinates,
        }

        const userPosition = updatedUser.coordinates
          ?.split(",")
          ?.map((x) => +x) ?? [0, 0]

        prevParticpants[foundIndex] = updatedUser
        updateUserCoords(foundUser.username, {
          x: userPosition[0],
          y: userPosition[1],
        })
      }

      return prevParticpants
    })
  })

  const handleUpdateCoordinates = (position: { x: number; y: number }) => {
    socket?.emit("updateCoordinates", {
      room_id: room?.id,
      coordinates: `${position.x ?? __VARS.defaultPositionOfUserX},${
        position.y ?? __VARS.defaultPositionOfUserY
      }`,
      username: livekitIdentity,
    })
  }

  const handleUpdateLocalCoords = (position: { x: number; y: number }) => {
    updateUserCoords(user?.username, position)
  }

  const isMyUser = user?.username === livekitIdentity

  const positionUser = participants?.find(
    (x) => x?.username === livekitIdentity
  )

  const coordsUser = positionUser?.coordinates?.split(",")?.map((x) => +x) ?? [
    __VARS.defaultPositionOfUserX,
    __VARS.defaultPositionOfUserY,
  ]

  return (
    <DraggableRoom
      onDragEnd={(position) => {
        handleUpdateCoordinates(position)
        setIsDragging(false)
      }}
      onDragging={handleUpdateLocalCoords}
      onStartDragging={handleStartDragging}
      disabled={!isMyUser}
      hasTransition={!isMyUser}
      x={coordsUser?.[0]}
      y={coordsUser?.[1]}
    >
      <SessionWrapper>
        <ParticipantTile isDragging={isDragging} />
      </SessionWrapper>
    </DraggableRoom>
  )
}
