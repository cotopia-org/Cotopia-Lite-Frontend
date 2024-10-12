import CBadge from "@/components/shared-ui/c-badge";
import React, { useMemo } from "react";
import { useChat } from "../..";
import { useAppSelector } from "@/store/redux/store";

export default function UnSeenMessages() {
  //Getting locale chat item context
  const { chat } = useChat();

  //Get chats from redux slice
  const { chats } = useAppSelector((store) => store.chatSlice);

  const unSeenMessages = useMemo(() => {
    const targetChatUnseenMessages = chats[chat.id].messages.filter(
      (x) => x.seen === false
    );

    return targetChatUnseenMessages;
  }, [chats, chat?.id]);

  return (
    <CBadge
      count={unSeenMessages.length}
      className='absolute bottom-2 right-2'
      size='normal'
    />
  );
}
