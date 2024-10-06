import { ChatType } from "@/types/chat2";

type Props = {
  chat: ChatType;
};
export default function ChatDetails({ chat }: Props) {
  return (
    <div className='flex flex-col gap-y-1 flex-1'>
      <div className='flex flex-row items-center justify-between'>
        <strong>{chat.title}</strong>
        <span className='text-xs text-gray-500'>21:32</span>
      </div>
      <span className='text-sm text-gray-500'>Last message preview</span>
    </div>
  );
}
