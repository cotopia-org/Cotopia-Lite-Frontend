import { v4 as uuidv4 } from "uuid"

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { ChatItemType } from "@/types/chat"
import { useAppDispatch, useAppSelector } from "@/store/redux/store"
import {
  addToQueueAction,
  deleteFromQueueAction,
  updateMessagesAction,
} from "@/store/redux/slices/room-slice"
import { RoomEnvironmentType } from "@/context/chat-room-context"

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

function messageCreator({
  text,
  room_id,
  reply_to = null,
}: {
  text: string
  room_id?: number
  reply_to?: ChatItemType | null
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
    seen: false,
    text,
    is_sent: true,
    updated_at: null,
    user: null,
    nonce_id: new Date().getTime(),
  } as PartialBy<ChatItemType, "id">
}

//id is always room id
export const useChatSocket = (id: number) => {
  const appDispatch = useAppDispatch()

  const socket = useSocket()

  const send = async ({
    message,
    replyTo,
  }: {
    message: string
    replyTo?: ChatItemType
  }) => {
    const tempMessage = messageCreator({
      text: message,
      room_id: id,
      reply_to: replyTo,
    })

    appDispatch(
      addToQueueAction({
        message: tempMessage,
      })
    )
    //Now message added to queue
    socket?.emit("sendMessage", tempMessage, (message: ChatItemType) => {
      appDispatch(
        deleteFromQueueAction({
          message,
        })
      )
    })
  }
  const edit = async ({ message }: { message: ChatItemType }) => {
    appDispatch(
      updateMessagesAction({
        message: { ...message, is_edited: true },
      })
    )
    //Now message added to queue
    socket?.emit("updateMessage", message, (message: ChatItemType) => {})
  }

  return { send, edit }
}
