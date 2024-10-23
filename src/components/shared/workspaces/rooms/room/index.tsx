import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper"
import { WorkspaceRoomJoinType, WorkspaceRoomShortType } from "@/types/room"
import { useRouter } from "next/navigation"
import { WorkspaceUserType } from "@/types/user"
import { uniqueById, urlWithQueryParams } from "@/lib/utils"
import axiosInstance, { FetchDataType } from "@/lib/axios"
import useSetting from "@/hooks/use-setting"
import { playSoundEffect } from "@/lib/sound-effects"
import { dispatch } from "use-bus"
import { _BUS } from "@/app/const/bus"
import RoomItem from "./room-item"
import { useParticipants } from "@livekit/components-react"
import { useMemo } from "react"
import { Track } from "livekit-client"
import ParticipantRows from "@/components/shared/participant-rows"

type Props = {
  room: WorkspaceRoomShortType
  workspace_id: number
  selected_room_id?: number
  participants: WorkspaceUserType[]
}

export default function WorkspaceRoom({
  workspace_id,
  room,
  selected_room_id,
  participants,
}: Props) {
  const { user } = useProfile()

  const { sounds } = useSetting()

  const router = useRouter()

  const socket = useSocket()

  const joinRoomHandler = async () => {
    if (!socket) return

    if (selected_room_id !== room.id) {
      socket.emit("joinedRoom", room.id, () => {
        axiosInstance
          .get<FetchDataType<WorkspaceRoomJoinType>>(`/rooms/${room.id}/join`)
          .then((res) => {
            const livekitToken = res.data.data.token //Getting livekit token from joinObject

            if (sounds.userJoinLeft) playSoundEffect("joined")

            if (livekitToken) {
              dispatch({
                type: _BUS.userLeftRoom,
                user_id: user.id,
              })
              router.push(
                urlWithQueryParams(
                  `/workspaces/${workspace_id}/rooms/${room.id}`,
                  { token: livekitToken, isSwitching: true }
                )
              )

              return
            }
          })
      })
    }
  }

  const isSelected = selected_room_id ? room?.id === selected_room_id : false

  let clss = "!justify-start !text-left flex-1"
  if (isSelected) clss += ` !bg-black/10 !text-black`

  const lkParticipants = useParticipants()

  const uniquedParticipants = useMemo(() => {
    return uniqueById(
      participants.map((p) => {
        const lkParticipant = lkParticipants.find(
          (lkp) => lkp.identity === p?.username
        )
        let video_track = lkParticipant?.getTrackPublication(
          Track.Source.Camera
        )
        let screen_track = lkParticipant?.getTrackPublication(
          Track.Source.ScreenShare
        )
        let mic_track = lkParticipant?.getTrackPublication(
          Track.Source.Microphone
        )
        return {
          ...p,
          has_video: video_track?.videoTrack ?? false,
          has_screen_share: screen_track?.isEnabled ?? false,
          has_mic: mic_track?.isEnabled ?? false,
        }
      })
    )
  }, [lkParticipants, participants])

  return (
    <div className="flex flex-col gap-y-3">
      <RoomItem
        joinRoomHandler={joinRoomHandler}
        room={room}
        isSelected={isSelected}
      />
      <ParticipantRows
        participants={uniquedParticipants as WorkspaceUserType[]}
      />
      {/* <ParticipantsWithPopover
        avatarClss="border border-primary"
        className="ml-6"
        roomId={room.id}
        participants={uniquedParticipants as WorkspaceUserType[]}
      /> */}
    </div>
  )
}
