import { ChatType } from "@/types/chat2";

type Props = {
  title: string;
  sub_title?: string;
  description?: string;
};
export default function ChatDetails({ title, sub_title, description }: Props) {
  return (
    <div className='flex flex-col gap-y-1 flex-1'>
      <div className='flex flex-row items-center justify-between'>
        <strong>{title}</strong>
        {!!sub_title && (
          <span className='text-xs text-gray-500'>{sub_title}</span>
        )}
      </div>
      {!!description && (
        <span className='text-sm text-gray-500'>{description}</span>
      )}
    </div>
  );
}
