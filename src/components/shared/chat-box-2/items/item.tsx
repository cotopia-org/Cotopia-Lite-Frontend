import { Chat2ItemType } from "@/types/chat2";

type Props = {
  item: Chat2ItemType;
};
export default function ChatItem({ item }: Props) {
  const isUser = false;

  return (
    <div
      className={`message-item flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow text-white ${
          isUser ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        {item.text}
      </div>
    </div>
  );
}
