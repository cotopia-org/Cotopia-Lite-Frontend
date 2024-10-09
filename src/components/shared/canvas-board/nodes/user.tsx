import React, { useMemo } from "react"
import UserSession from "@/app/(pages)/(protected)/session"
import { useParticipants, useTracks } from "@livekit/components-react"
import { RoomEvent, Track } from "livekit-client"

const UserNode = (props: any) => {
  const { data, dragging } = props

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    {
      updateOnlyOn: [
        RoomEvent.ActiveSpeakersChanged,
        RoomEvent.Reconnected,
        RoomEvent.Reconnecting,
        RoomEvent.MediaDevicesChanged,
        RoomEvent.LocalTrackPublished,
        RoomEvent.TrackUnsubscribed,
      ],
      onlySubscribed: true,
    }
  )
  const participants = useParticipants()

  const allRoomParticipantUsername = useMemo(() => {
    return participants?.map((x) => x.identity) ?? []
  }, [participants])

  const track = useMemo(() => {
    if (!data?.username) return undefined

    if (tracks.length === 0) return undefined

    return tracks.find((x) => x.participant.identity === data.username)
  }, [tracks, data.username])

  const participant = useMemo(() => {
    if (participants.length === 0) return undefined

    return participants.find((x) => x.identity === data.username)
  }, [participants, data.username])

  if (!allRoomParticipantUsername.includes(data?.username)) return

  return (
    <>
      <UserSession
        participant={participant}
        track={track}
        draggable={data?.draggable ?? false}
        isDragging={dragging}
      />
    </>
  )
}

export default UserNode
