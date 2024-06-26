import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import ChatBox from "@/components/shared/chat-box";
import ChatUserInput from "@/components/shared/chat-box/user-input";
import { getUserFullname } from "@/lib/utils";
import { ChatItemType } from "@/types/chat";
import { UserMinimalType } from "@/types/user";
import { ChevronLeft, MoveLeft } from "lucide-react";
import moment from "moment";
import { useCallback, useState } from "react";

type Props = {
  user: UserMinimalType;
  onBack: () => void;
};
export default function DirectChat({ user, onBack }: Props) {
  const [messages, setMessages] = useState<ChatItemType[]>([]);

  const handleAddMessage = useCallback(async (message: string) => {
    //   if (!room_id) return;
    //   try {
    //     const res = await sendToRoom(message, room_id);
    //     console.log("res", res);
    //   } catch (e) {}
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: Math.random() * 10000000000000,
    //     date: moment().unix(),
    //     username: "mahdi.dev",
    //     message,
    //   },
    // ]);
  }, []);

  return (
    <div className='flex flex-col h-[calc(100vh-224px)]'>
      <div className='flex flex-row items-center gap-1'>
        <CotopiaIconButton className='text-black/60' onClick={onBack}>
          <ChevronLeft />
        </CotopiaIconButton>
        <p>
          {`Chat with`}
          <strong className='ml-1'>{`${getUserFullname(user)}`}</strong>
        </p>
      </div>
      <div className='relative h-full flex flex-col justify-between pt-8'>
        <ChatBox items={messages} />
        <ChatUserInput onAdd={handleAddMessage} />
      </div>
    </div>
  );
}
