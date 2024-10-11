import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import ParticipantDetails from "@/components/shared/room/participant-detail";
import { capitalizeWords } from "@/lib/utils";
import { Chat2ItemType } from "@/types/chat2";
import { UserType } from "@/types/user";
import { useChatItem } from ".";

type Props = {
  chat: Chat2ItemType;
};
export default function ChatUserOverView({ chat }: Props) {
  const { getUser } = useChatItem();

  const user = getUser(chat.user);

  if (!user) return;

  return (
    <ParticipantDetails user={user}>
      <CotopiaAvatar
        className='w-9 h-9'
        src={user?.avatar?.url}
        title={capitalizeWords(user.username)?.[0] ?? ""}
      />
    </ParticipantDetails>
  );
}
