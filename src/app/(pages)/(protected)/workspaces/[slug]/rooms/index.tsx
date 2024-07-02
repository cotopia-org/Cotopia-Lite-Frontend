import FullLoading from "@/components/shared/full-loading";
import { useApi } from "@/hooks/swr";
import AddRoom from "./add-room";
import WorkspaceRooms from "@/components/shared/workspaces/rooms";
import { WorkspaceRoomShortType, WorkspaceRoomType } from "@/types/room";
import { FetchDataType } from "@/lib/axios";

type Props = {
  workspace_id: string;
};

export default function WorkspaceRoomsHolder({ workspace_id }: Props) {
  const { data, isLoading } = useApi<FetchDataType<WorkspaceRoomShortType[]>>(
    `/workspaces/${workspace_id}/rooms`
  );
  const items = !!data ? data?.data : [];

  let content = (
    <div className='flex flex-col gap-y-4'>
      <WorkspaceRooms workspace_id={+workspace_id} rooms={items} />
      <AddRoom workspace_id={workspace_id} />
    </div>
  );

  if (isLoading) content = <FullLoading />;

  return content;
}
