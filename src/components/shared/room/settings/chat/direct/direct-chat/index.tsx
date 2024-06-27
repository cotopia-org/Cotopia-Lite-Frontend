import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import ChatBox from "@/components/shared/chat-box";
import ChatUserInput from "@/components/shared/chat-box/user-input";
import FullLoading from "@/components/shared/full-loading";
import { useChat } from "@/hooks/chat/use-chat";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { getUserFullname } from "@/lib/utils";
import { ChatItemType } from "@/types/chat";
import { MessageType } from "@/types/message";
import { UserMinimalType } from "@/types/user";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  user: UserMinimalType;
  direct_id: number;
  onBack: () => void;
};
export default function DirectChat({ user, direct_id, onBack }: Props) {
  const { user: myAccount } = useProfile();

  const { startLoading, stopLoading, isLoading } = useLoading();
  const [messages, setMessages] = useState<ChatItemType[]>([]);

  const getMessages = () => {
    startLoading();
    axiosInstance
      .get(`/rooms/${direct_id}/messages`)
      .then((res) => {
        const data = res.data;
        const items: MessageType[] = !!data ? data?.data : [];
        setMessages(items);
        stopLoading();
      })
      .catch((err) => {
        stopLoading();
      });
  };
  useEffect(() => {
    getMessages();
  }, []);

  const { sendToDirect } = useChat();

  const handleAddMessage = useCallback(
    async (text: string) => {
      if (!user?.id) return;
      sendToDirect(text, user?.id);
    },
    [user?.id]
  );

  useSocket("directMessages", (data: MessageType) => {
    setMessages((prev) => [data, ...prev]);
  });

  if (isLoading) return <FullLoading />;

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
        <ChatBox items={messages} observer_user_id={myAccount?.id} />
        <ChatUserInput onAdd={handleAddMessage} />
      </div>
    </div>
  );
}
