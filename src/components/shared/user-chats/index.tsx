import { ChatType } from "@/types/chat2";
import Chat from "./chat";
import SlidePusher from "../slide-pusher";
import { UserMinimalType } from "@/types/user";

type Props = {
  chats: ChatType[];
  getUser: (user_id: number) => UserMinimalType | undefined;
};

export default function Chats({ chats = [], getUser }: Props) {
  return (
    <SlidePusher>
      <div className='w-full chats-holder flex flex-col gap-y-0'>
        {chats.map((chat) => (
          <Chat getUser={getUser} chat={chat} key={chat.id} />
        ))}
      </div>
    </SlidePusher>
  );
}
