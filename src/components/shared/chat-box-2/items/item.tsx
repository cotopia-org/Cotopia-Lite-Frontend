import { MessageType } from "@/types/message";

type Props = {
  item: MessageType;
};
export default function ChatItem({ item }: Props) {
  const isUser = false;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
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
