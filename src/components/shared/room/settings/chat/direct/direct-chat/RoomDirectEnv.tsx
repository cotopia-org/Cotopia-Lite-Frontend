"use client"

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import FullLoading from "@/components/shared/full-loading"
import { useChat } from "@/hooks/chat/use-chat"
import useLoading from "@/hooks/use-loading"
import axiosInstance from "@/lib/axios"
import { getUserFullname } from "@/lib/utils"
import { ChatItemType } from "@/types/chat"
import { MessageType } from "@/types/message"
import { UserMinimalType } from "@/types/user"
import { useCallback, useEffect, useState } from "react"
import { dispatch } from "use-bus"
import DirectChatBox from "."

interface Props {
  user: UserMinimalType
  direct_id: number
  onBack: () => void
}

const RoomDirectEnv = ({ direct_id, onBack, user }: Props) => {
  const { startLoading, stopLoading, isLoading } = useLoading()
  const [messages, setMessages] = useState<ChatItemType[] | undefined>(
    undefined
  )

  const getMessages = () => {
    startLoading()
    axiosInstance
      .get(`/rooms/${direct_id}/messages`)
      .then((res) => {
        const data = res.data
        const items: MessageType[] = !!data ? data?.data : []
        setMessages(items)
        stopLoading()
      })
      .catch((err) => {
        stopLoading()
      })
  }
  useEffect(() => {
    getMessages()
  }, [])

  const { sendToDirect } = useChat()

  const handleUpdateMessages = (chat: ChatItemType) => {
    const lastMessages = !!messages ? [...messages] : []
    const chatIds = lastMessages.map((x) => x.id)
    const foundIndex = chatIds.indexOf(chat.id)

    let newMessages = [...lastMessages]

    if (foundIndex > -1) {
      newMessages[foundIndex] = chat
    } else {
      newMessages = [chat, ...lastMessages]
    }

    setMessages(newMessages)
  }

  const handleAddMessage = useCallback(
    async (text: string) => {
      if (!user?.id) return
      try {
        const message = await sendToDirect(text, user?.id)
        if (message) handleUpdateMessages(message)
        dispatch(_BUS.scrollEndChatBox)
      } catch (e) {}
    },
    [user?.id, handleUpdateMessages]
  )

  useSocket(
    "directMessages",
    (data: MessageType) => {
      handleUpdateMessages(data)
    },
    [handleUpdateMessages]
  )

  let content = null

  if (isLoading) content = <FullLoading />

  if (!isLoading && !!messages)
    content = (
      <DirectChatBox
        messages={messages}
        onAdd={handleAddMessage}
        user={user}
        onBack={onBack}
      />
    )

  return content
}

export default RoomDirectEnv
