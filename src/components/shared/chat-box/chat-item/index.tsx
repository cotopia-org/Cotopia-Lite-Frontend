import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { ChatItemType } from "@/types/chat";
import Avatar from "./avatar";
import Username from "./username";
import Time from "./time";
import moment from "moment";
import Message from "./message";

type Props = {
  item: ChatItemType;
};
export default function ChatItem({ item }: Props) {
  return (
    <div className='flex flex-row items-center gap-x-4'>
      <Avatar title='E' />
      <div className='flex flex-col gap-y-1'>
        <div className='flex flex-row items-center gap-x-1'>
          <Username username={item.username} />
          <Time time={item.date} />
        </div>
        <Message message={item.message} />
      </div>
    </div>
  );
}
