import { ChatItemType } from "@/types/chat";
import Avatar from "./avatar";
import Username from "./username";
import Time from "./time";
import Message from "./message";
import MyMessage from "./my-message";
import TheirMessage from "./their-message";
import { getUserFullname } from "@/lib/utils";

type Props = {
  item: ChatItemType;
  observer_user_id?: number;
};
export default function ChatItem({ item, observer_user_id }: Props) {
  const isMyMessage = item.user?.id === observer_user_id;

  let content = (
    <div className='relative flex flex-row items-start gap-x-2'>
      {!isMyMessage && <Avatar title={getUserFullname(item?.user)?.[0]} />}
      <div className='relative flex flex-row items-center gap-x-4 p-2 pb-4 rounded-lg bg-black/5 w-[200px] max-w-full'>
        <div className='flex flex-col gap-y-1'>
          <div className='flex flex-row items-center gap-x-1'>
            <Username username={item.user.username} />
          </div>
          <Message item={item} />
        </div>
        <div className='absolute bottom-1 right-2'>
          <Time time={item.created_at} />
        </div>
      </div>
    </div>
  );

  return isMyMessage ? (
    <MyMessage>{content}</MyMessage>
  ) : (
    <TheirMessage>{content}</TheirMessage>
  );
}
