import { useChat } from "@/hooks/chat/use-chat";
import { UserMinimalType } from "@/types/user";
import DirectChatBox from ".";
import ChatUserInput from "@/components/shared/chat-box/user-input";

interface Props {
  user: UserMinimalType;
  onBack?: () => void;
  onAdd: (room_id: number) => void;
}

const LocalDirectEnv = ({ user, onBack, onAdd }: Props) => {
  const { sendToDirect } = useChat();

  const addMessageHandler = async (val: string) => {
    // if (!user?.id) return;
    // try {
    //   const direct = await sendToDirect(val, user.id);
    //   if (direct?.room_id === undefined) return;
    //   if (direct) onAdd(direct.room_id);
    // } catch (error) {}
  };

  return (
    <DirectChatBox
      inputNode={<ChatUserInput onAdd={addMessageHandler} />}
      onAdd={addMessageHandler}
      onBack={onBack}
      user={user}
      messages={[]}
    />
  );
};

export default LocalDirectEnv;
