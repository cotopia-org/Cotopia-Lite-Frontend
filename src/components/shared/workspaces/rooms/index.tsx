import { WorkspaceRoomType } from "@/types/room";
import WorkspaceRoom from "./room";

type Props = {
  rooms: WorkspaceRoomType[];
};
export default function WorkspaceRooms({ rooms }: Props) {
  if (rooms.length === 0) return null;

  return (
    <div className='flex flex-col'>
      <strong className='mb-2 text-gray-600'>Rooms</strong>
      {rooms.map((room) => (
        <WorkspaceRoom key={room.id} room={room} />
      ))}
    </div>
  );
}
