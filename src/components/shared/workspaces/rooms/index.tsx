import { WorkspaceRoomShortType } from "@/types/room";
import WorkspaceRoom from "./room";
import TitleEl from "../../title-el";

type Props = {
  rooms: WorkspaceRoomShortType[];
  workspace_id: number;
  selected_room_id?: number;
};
export default function WorkspaceRooms({
  workspace_id,
  rooms,
  selected_room_id,
}: Props) {
  if (rooms.length === 0) return null;

  return (
    <TitleEl title='Rooms'>
      {rooms.map((room) => (
        <WorkspaceRoom
          selected_room_id={selected_room_id}
          key={room.id}
          workspace_id={workspace_id}
          room={room}
        />
      ))}
    </TitleEl>
  );
}
