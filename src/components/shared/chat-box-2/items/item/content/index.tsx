import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { Chat2ItemType } from "@/types/chat2";
import ChatDate from "./date";

type Props = {
  chat: Chat2ItemType;
};
export default function ChatItemContent({ chat }: Props) {
  const { user: myAccount } = useProfile();

  const isMyUser = myAccount.id === chat.user?.id;

  return (
    <div className='flex flex-1 flex-col bg-black/5 rounded-xl rounded-bl-none p-2 max-w-full w-full'>
      {!!!isMyUser && <strong>{chat.user.name}</strong>}
      <p
        className='text-wrap mb-3 w-full'
        dir='auto'
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
      >
        {chat.text}
      </p>
      <ChatDate chat={chat} />
    </div>
  );
}
