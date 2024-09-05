import { v4 as uuidv4 } from "uuid";

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import { ChatItemType } from "@/types/chat";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import {
  addToQueueAction,
  deleteFromQueueAction,
} from "@/store/redux/slices/room-slice";
import { RoomEnvironmentType } from "@/context/chat-room-context";

function messageCreator({
  text,
  room_id,
  user_id,
  reply_to = null,
}: {
  text: string;
  room_id?: number;
  user_id?: number;
  reply_to?: ChatItemType | null;
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
  } as Omit<ChatItemType, "id">;
}

//env id can be room_id or user_id - Environment Id
export const useChatSocket = (id: number, type: RoomEnvironmentType) => {
  const roomSlice = useAppSelector((store) => store.roomSlice);
  const queues = roomSlice?.queues ?? [];

  const appDispatch = useAppDispatch();

  const socket = useSocket();

  const send = async (message: string, replyTo?: ChatItemType) => {
    if (type === RoomEnvironmentType.room) {
      //First We should add message to queue
      //Second We should remove message from queue as soon as receive socket event (sendMessage)

      const tempMessage = messageCreator({
        text: message,
        room_id: id,
        reply_to: replyTo,
      });

      appDispatch(
        addToQueueAction({
          message: {
            id: tempMessage.nonce_id as number,
            ...tempMessage,
          },
        })
      );

      //Now message added to queue
      socket?.emit("sendMessage", tempMessage, (message: ChatItemType) => {
        appDispatch(
          deleteFromQueueAction({
            chat_nonce_id: message.nonce_id,
            room_id: message.room_id,
          })
        );
      });
    } else if (type === RoomEnvironmentType.direct) {
      socket?.emit(
        "sendMessage",
        messageCreator({ text: message, user_id: id, reply_to: replyTo }),
        (message: ChatItemType) => {}
      );
    }
  };

  return { send, queues };
};
