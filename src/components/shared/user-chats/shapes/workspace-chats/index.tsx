import AddChat from "./add-chat";
import Chats from "../..";
import { useChat2 } from "@/hooks/chat/use-chat-2";
import FullLoading from "@/components/shared/full-loading";
import { useRoomContext } from "@/components/shared/room/room-context";
import { useCallback } from "react";

type Props = {
  workspace_id: number;
};
export default function WorkspaceChats({ workspace_id }: Props) {
  const { chats, loading, participants } = useChat2({ workspace_id });

  const loadUserByUserId = useCallback(
    (user_id: number) => {
      const user = participants.find((x) => x.id === user_id);

      return user;
    },
    [participants]
  );

  let content = (
    <>
      <AddChat workspace_id={workspace_id} />
      <Chats chats={chats} getUser={loadUserByUserId} />
    </>
  );

  if (loading) content = <FullLoading />;

  return <div className='flex flex-col gap-y-2'>{content}</div>;
}
