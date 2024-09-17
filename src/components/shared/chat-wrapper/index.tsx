"use client"

import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper"
import { playSoundEffect } from "@/lib/sound-effects"
import {
  removeMessageAction,
  unreadMessagesAction,
  updateMessagesAction,
} from "@/store/redux/slices/room-slice"
import { useAppDispatch } from "@/store/redux/store"
import { ChatItemType } from "@/types/chat"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export default function ChatWrapper({ children }: Props) {
  const appDispatch = useAppDispatch()

  useSocket("messageReceived", (data: ChatItemType) => {
    console.log(data, "RECEIVED DATA")
    const isDirect = data?.is_direct
    playSoundEffect("newMessage2")
    appDispatch(
      updateMessagesAction({
        message: data,
      })
    )
    appDispatch(
      unreadMessagesAction({
        message: data,
        messageType: isDirect ? "direct" : "room",
      })
    )
  })

  useSocket("messageSeen", (data) => {
    const message = data.message
    let convertedMessage = { ...message, seen: true }
    appDispatch(
      updateMessagesAction({
        message: convertedMessage,
      })
    )
  })

  useSocket("messageUpdated", (data) => {
    console.log(data, "MESSAGE UPDATED")
    appDispatch(updateMessagesAction({ message: data }))
  })
  useSocket("messageDeleted", (data) => {
    console.log(data, "MESSAGE Deleted")
    appDispatch(removeMessageAction({ message: data }))
  })

  return <>{children}</>
}
