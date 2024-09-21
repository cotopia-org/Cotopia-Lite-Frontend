import { useAppSelector } from "@/store/redux/store";
import React from "react";
import { useRoomContext } from "../../../room-context";
import Chat2 from "@/components/shared/chat-box-2";

export default function RoomChats() {
  const { chatRoom } = useAppSelector((store) => store.roomSlice);
  const { room_id } = useRoomContext();
  const messages = chatRoom ? chatRoom?.[room_id]?.messages ?? [] : [];

  return (
    <Chat2
      items={messages}
      onFetchNewMessages={() =>
        new Promise((res) =>
          setTimeout(() => {
            res();
          }, 2000)
        )
      }
    />
  );
}
