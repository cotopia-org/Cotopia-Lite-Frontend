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

export type MessageMentionType = {
  start_position: number
  model_type: string
  model_id: number
}
export type MessageLinkType = {
  start_position: number
  url: string
  text: string
}

export type MessagePayloadType = {
  text: string
  mentions?: MessageMentionType[]
  links?: MessageLinkType[]
  replyTo?: ChatItemType
  mentioned_everyone?: boolean
}

function messageCreator({
  text,
  room_id,
  reply_to = null,
  is_direct,
  mentioned_everyone = false,
  mentions,
  links,
  user,
}: {
  text: string
  mentions?: MessageMentionType[]
  mentioned_everyone?: boolean
  links?: MessageLinkType[]
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
    mentions: mentions ?? [],
    links: links ?? [],
    reply_to,
    room_id,
    is_direct,
    seen: false,
    text,
    updated_at: null,
    ...(mentioned_everyone ? { mentioned_everyone: true } : {}),
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

  const send = async ({ payload }: { payload: MessagePayloadType }) => {
    let tempMessage = messageCreator({
      text: payload?.text ?? "",
      room_id: id,
      reply_to: payload?.replyTo ?? null,
      user,
      mentioned_everyone: payload?.mentioned_everyone ?? false,
      mentions: payload?.mentions ?? [],
      links: payload?.links ?? [],
    })

    tempMessage["channel"] = channel
    tempMessage["is_direct"] = env === RoomEnvironmentType.direct

    appDispatch(
      addToQueueAction({
        message: tempMessage,
      })
    )

    //Now message added to queue
    socket?.emit("sendMessage", tempMessage, (message: ChatItemType) => {
      console.log(message, "MESSAGE")
    })
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
