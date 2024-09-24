import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import ParticipantDetails from "@/components/shared/room/participant-detail";
import { Chat2ItemType } from "@/types/chat2";

type Props = {
  chat: Chat2ItemType;
};
export default function ChatUserOverView({ chat }: Props) {
  return (
    <ParticipantDetails user={chat.user}>
      <CotopiaAvatar className='w-9 h-9' src={chat.user?.avatar?.url} />
    </ParticipantDetails>
  );
}
