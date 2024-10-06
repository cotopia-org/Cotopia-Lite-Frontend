import { ChatType } from "@/types/chat2";
import Chat from "./chat";

type Props = {
  chats: ChatType[];
};

export default function Chats({ chats = [] }: Props) {
  return (
    <div className='chats-holder flex flex-col gap-y-0'>
      {chats.map((chat) => (
        <Chat chat={chat} key={chat.id} />
      ))}
    </div>
  );
}
