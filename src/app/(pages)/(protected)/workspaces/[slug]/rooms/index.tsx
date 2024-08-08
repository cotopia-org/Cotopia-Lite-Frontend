import FullLoading from "@/components/shared/full-loading";
import { useApi } from "@/hooks/swr";
import AddRoom from "./add-room";
import WorkspaceRooms from "@/components/shared/workspaces/rooms";
import { WorkspaceRoomShortType, WorkspaceRoomType } from "@/types/room";
import { FetchDataType } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "../../../protected-wrapper";

type Props = {
  workspace_id: string;
};

export default function WorkspaceRoomsHolder({ workspace_id }: Props) {
  const { room_id } = useParams();

  const { data, isLoading, mutate } = useApi<
    FetchDataType<WorkspaceRoomShortType[]>
  >(`/workspaces/${workspace_id}/rooms`);
  const items = !!data ? data?.data : [];

  const [rooms, setRooms] = useState<WorkspaceRoomShortType[]>([]);
  useEffect(() => {
    setRooms(items);
  }, [items]);

  useSocket("roomUpdated", (data) => {
    mutate();
  });

  const handleAddRoom = (room: WorkspaceRoomShortType) =>
    setRooms((prev) => [...prev, room]);

  let content = (
    <div className='flex flex-col'>
      <WorkspaceRooms
        workspace_id={+workspace_id}
        rooms={rooms}
        selected_room_id={room_id ? +room_id : undefined}
      />
      <AddRoom workspace_id={workspace_id} onAdd={handleAddRoom} />
    </div>
  );

  if (isLoading) content = <FullLoading />;

  return content;
}
