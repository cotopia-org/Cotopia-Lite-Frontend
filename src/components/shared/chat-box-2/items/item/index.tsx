import { Chat2ItemType } from "@/types/chat2";
import ChatUserOverView from "./user-overview";
import ChatItemContent from "./content";

type Props = {
  item: Chat2ItemType;
};
export default function ChatItem({ item }: Props) {
  return (
    <div className={`message-item p-2 flex flex-row items-end gap-x-2`}>
      <ChatUserOverView chat={item} />
      <ChatItemContent chat={item} />
    </div>
  );
}
