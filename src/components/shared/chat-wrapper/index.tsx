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
import { toast } from "sonner"

type Props = {
  children: ReactNode
}
export default function ChatWrapper({ children }: Props) {
  const { user } = useProfile()

  const appDispatch = useAppDispatch()

  // useSocket("messageReceived", (data: ChatItemType) => {
  //   if (user.id !== data.user?.id) playSoundEffect("newMessage2")
  //   appDispatch(
  //     updateMessagesAction({
  //       message: data,
  //     })
  //   )
  //   appDispatch(
  //     unreadMessagesAction({
  //       message: data,
  //       messageType: "room",
  //       myAccountId: user.id,
  //     })
  //   )
  // })

  useSocket("directMessages", (data) => {
    if (user.id !== data.user?.id) {
      playSoundEffect("newMessage2")
      appDispatch(
        unreadMessagesAction({
          message: data,
          messageType: "direct",
        })
      )
    }
    appDispatch(
      updateMessagesAction({
        message: data,
      })
    )
  })

  useSocket("roomMessages", (data) => {
    if (user.id !== data.user?.id) {
      playSoundEffect("newMessage2")
      appDispatch(
        unreadMessagesAction({
          message: data,
          messageType: "room",
        })
      )
    }
    appDispatch(
      updateMessagesAction({
        message: data,
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
    appDispatch(updateMessagesAction({ message: data }))
  })
  useSocket("messageDeleted", (data) => {
    appDispatch(removeMessageAction({ message: data }))
  })

  return <>{children}</>
}
