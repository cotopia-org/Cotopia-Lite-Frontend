import axiosInstance, { FetchDataType } from "@/lib/axios";
import { MessageType } from "@/types/message";

export const useChat = () => {
  const sendToRoom = async (
    message: string,
    roomId: number | string,
    replyTo?: number
  ) => {
    let payload: { [key: string]: any } = {
      text: message,
      room_id: +roomId,
    };
    if (replyTo) payload["reply_to"] = replyTo;
    let res;
    try {
      res = await axiosInstance.post<FetchDataType<MessageType>>(
        `/messages`,
        payload
      );
    } catch (e) {}

    return res?.data.data;
  };
  return { sendToRoom };
};
