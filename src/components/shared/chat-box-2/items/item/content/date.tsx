import { Chat2ItemType } from "@/types/chat2";
import moment from "moment";

type Props = {
  chat: Chat2ItemType;
};
export default function ChatDate({ chat }: Props) {
  return (
    <div className='felx flex-col items-end w-full text-right'>
      <span className='text-xs text-black/60'>
        {moment(chat.nonce_id).format("HH:mm")}
      </span>
    </div>
  );
}
