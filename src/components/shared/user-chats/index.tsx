import { ChatType } from "@/types/chat2";
import Chat from "./chat";
import SlidePusher from "../slide-pusher";

type Props = {
  chats: ChatType[];
};

export default function Chats({ chats = [] }: Props) {
  return (
    <SlidePusher>
      <div className='w-full chats-holder flex flex-col gap-y-0'>
        {chats.map((chat) => (
          <Chat chat={chat} key={chat.id} />
        ))}
      </div>
    </SlidePusher>
  );
}
