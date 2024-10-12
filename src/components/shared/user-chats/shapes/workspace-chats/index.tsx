import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import AddChat from "./add-chat";
import SlidePusher from "@/components/shared/slide-pusher";
import { useChat2 } from "@/hooks/chat/use-chat-2";
import ChatsWrapper from "./chats-wrapper";

type Props = {
  workspace_id: number;
};
export default function WorkspaceChats({ workspace_id }: Props) {
  const { add, update } = useChat2({ workspace_id });

  useSocket("messageReceived", (data) => {
    add(data);
  });

  useSocket("messageUpdated", (data) => {
    update(data);
  });

  let content = (
    <>
      <AddChat workspace_id={workspace_id} />
      <SlidePusher>
        <ChatsWrapper />
      </SlidePusher>
    </>
  );

  return <div className='flex flex-col gap-y-2'>{content}</div>;
}
