import axiosInstance, { FetchDataType } from "@/lib/axios"
import { MessageType } from "@/types/message"

export const useChat = () => {
  const seenMessage = (messageId: number) => {
    return axiosInstance.get(`/messages/${messageId}/seen`)
  }

  const sendToRoom = async (
    message: string,
    roomId: number | string,
    replyTo?: number
  ) => {
    let payload: { [key: string]: any } = {
      text: message,
      room_id: +roomId,
    }
    if (replyTo) payload["reply_to"] = replyTo
    let res
    try {
      res = await axiosInstance.post<FetchDataType<MessageType>>(
        `/messages`,
        payload
      )
    } catch (e) {}

    return res?.data.data
  }

  const sendToDirect = async (
    message: string,
    userId?: number | string,
    replyTo?: number
  ) => {
    if (!userId) return
    let payload: { [key: string]: any } = {
      text: message,
      user_id: +userId,
    }
    if (replyTo) payload["reply_to"] = replyTo
    let res
    try {
      res = await axiosInstance.post<FetchDataType<MessageType>>(
        `/messages`,
        payload
      )
    } catch (e) {}

    return res?.data.data
  }

  const editMessage = async (
    newMessage: string,
    messageId: number | string
  ) => {
    let payload: { [key: string]: any } = {
      text: newMessage,
    }

    let res = await axiosInstance.put<FetchDataType<MessageType>>(
      `/messages/${messageId}`,
      payload
    )
    return res?.data?.data
  }
  const deleteMessage = async (messageId: number | string) => {
    let res = await axiosInstance.delete<FetchDataType<MessageType>>(
      `/messages/${messageId}`
    )
    return res?.data?.data
  }
  return { sendToRoom, sendToDirect, seenMessage, editMessage, deleteMessage }
}
