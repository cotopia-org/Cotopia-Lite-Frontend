import FullLoading from "@/components/shared/full-loading";
import { useApi } from "@/hooks/swr";
import AddRoom from "./add-room";
import WorkspaceRooms from "@/components/shared/workspaces/rooms";
import { WorkspaceRoomType } from "@/types/room";

type Props = {
  workspace_id: string;
};

export default function WorkspaceRoomsHolder({ workspace_id }: Props) {
  const { data, isLoading } = useApi(`/workspaces/${workspace_id}/rooms`);
  const items: WorkspaceRoomType[] = !!data ? data : [];

  let content = (
    <div className='flex flex-col gap-y-4'>
      <WorkspaceRooms rooms={items} />
      <AddRoom workspace_id={workspace_id} />
    </div>
  );

  if (isLoading) content = <FullLoading />;

  return content;
}
