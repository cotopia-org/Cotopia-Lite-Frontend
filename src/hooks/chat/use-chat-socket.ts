import { v4 as uuidv4 } from "uuid"

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { ChatItemType } from "@/types/chat"
import { useAppDispatch } from "@/store/redux/store"
import {
  addToQueueAction,
  removeMessageAction,
  updateMessagesAction,
} from "@/store/redux/slices/room-slice"
import { UserType } from "@/types/user"
import { toast } from "sonner"
import { RoomEnvironmentType } from "@/context/chat-room-context"

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

function messageCreator({
  text,
  room_id,
  reply_to = null,
  is_direct,

  user,
}: {
  text: string
  room_id?: number
  reply_to?: ChatItemType | null
  is_direct?: boolean
  user: UserType
}) {
  //Check the user id - TODO

  return {
    created_at: Math.floor(new Date().getTime() / 1000),
    deleted_at: null,
    files: [],
    is_edited: false,
    is_pinned: false,
    links: [],
    mentions: [],
    reply_to,
    room_id,
    is_direct,
    seen: false,
    text,
    updated_at: null,
    user,
    nonce_id: Math.floor(Math.random() * 100000) * new Date().getTime(),
  } as PartialBy<ChatItemType, "id">
}

//id is always room id
export const useChatSocket = (
  id: number,
  user: UserType,
  env: RoomEnvironmentType
) => {
  const appDispatch = useAppDispatch()

  const isDirectEnv = env === RoomEnvironmentType.direct

  let channel = `room-${id}`
  if (isDirectEnv) {
    channel = `direct-${id}`
  }
  const socket = useSocket()

  const send = async ({
    message,
    replyTo,
  }: {
    message: string
    replyTo?: ChatItemType
  }) => {
    let tempMessage = messageCreator({
      text: message,
      room_id: id,
      reply_to: replyTo,
      user,
    })

    tempMessage["channel"] = channel
    tempMessage["is_direct"] = env === RoomEnvironmentType.direct

    appDispatch(
      addToQueueAction({
        message: tempMessage,
      })
    )

    //Now message added to queue
    socket?.emit("sendMessage", tempMessage, (message: ChatItemType) => {})
  }
  const edit = async ({ message }: { message: ChatItemType }) => {
    appDispatch(
      updateMessagesAction({
        message: { ...message, is_edited: true, channel },
      })
    )
    //Now message added to queue
    socket?.emit("updateMessage", message, (message: ChatItemType) => {})
  }

  const remove = async ({ message }: { message: ChatItemType }) => {
    socket?.emit(
      "deleteMessage",
      { nonce_id: message.nonce_id, channel },
      (message: ChatItemType) => {
        toast.success("Your message has been deleted successfully")
      }
    )
  }

  return { send, edit, remove }
}
