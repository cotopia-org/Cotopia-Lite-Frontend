import { WorkspaceRoomShortType } from "@/types/room";
import WorkspaceRoom from "./room";

type Props = {
  rooms: WorkspaceRoomShortType[];
  workspace_id: number;
};
export default function WorkspaceRooms({ workspace_id, rooms }: Props) {
  if (rooms.length === 0) return null;

  return (
    <div className='flex flex-col'>
      <strong className='mb-2 text-gray-600'>Rooms</strong>
      {rooms.map((room) => (
        <WorkspaceRoom key={room.id} workspace_id={workspace_id} room={room} />
      ))}
    </div>
  );
}
