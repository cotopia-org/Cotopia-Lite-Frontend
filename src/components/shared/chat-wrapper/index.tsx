"use client"

import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper"
import { playSoundEffect } from "@/lib/sound-effects"
import { updateMessagesAction } from "@/store/redux/slices/room-slice"
import { useAppDispatch } from "@/store/redux/store"
import { ChatItemType } from "@/types/chat"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export default function ChatWrapper({ children }: Props) {
  const { user } = useProfile()

  const appDispatch = useAppDispatch()

  useSocket("roomMessages", (data: ChatItemType) => {
    console.log(data, "ROOMDATA")
    if (user.id !== data.user?.id) playSoundEffect("newMessage2")
    appDispatch(updateMessagesAction({ message: data }))
  })

  useSocket("directMessages", (data) => {
    if (user.id !== data.user?.id) playSoundEffect("newMessage2")

    appDispatch(updateMessagesAction({ message: data }))
  })

  useSocket("seenMessage", (data) => {
    const message = data.message
    let convertedMessage = { ...message, seen: true }
    appDispatch(updateMessagesAction({ message: convertedMessage }))
  })

  useSocket("messageUpdated", (data) => {
    appDispatch(updateMessagesAction({ message: data }))
  })
  useSocket("messageDeleted", (data) => {
    appDispatch(updateMessagesAction({ message: data }))
  })

  return <>{children}</>
}
