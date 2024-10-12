import { ChatType } from "@/types/chat2";
import Chat from "./chat";
import SlidePusher from "../slide-pusher";
import { UserMinimalType } from "@/types/user";
import { useMemo } from "react";

type Props = {
  chats: ChatType[];
  getUser: (user_id: number) => UserMinimalType | undefined;
};

export default function Chats({ chats = [], getUser }: Props) {
  const chatSortedByLastMessage = useMemo(() => {
    return chats.sort(
      (a, b) => b?.last_message?.nonce_id - a?.last_message?.nonce_id
    );
  }, [chats]);

  return (
    <SlidePusher>
      <div className='w-full chats-holder flex flex-col gap-y-0'>
        {chatSortedByLastMessage.map((chat) => (
          <Chat getUser={getUser} chat={chat} key={chat.id} />
        ))}
      </div>
    </SlidePusher>
  );
}
