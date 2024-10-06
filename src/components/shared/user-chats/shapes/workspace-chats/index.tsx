import { useApi } from "@/hooks/swr";
import AddChat from "./add-chat";
import { urlWithQueryParams } from "@/lib/utils";
import { ChatType } from "@/types/chat2";
import Chats from "../..";

type Props = {
  workspace_id: string | number;
};
export default function WorkspaceChats({ workspace_id }: Props) {
  const { data, isLoading } = useApi(
    urlWithQueryParams(`/users/chats`, { workspace_id })
  );
  const chats: ChatType[] = data !== undefined ? data?.data : [];

  return (
    <div className='flex flex-col gap-y-2'>
      <AddChat workspace_id={workspace_id} />
      <Chats chats={chats} />
    </div>
  );
}
