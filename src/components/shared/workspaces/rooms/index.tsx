import { WorkspaceRoomShortType } from "@/types/room";
import WorkspaceRoom from "./room";
import TitleEl from "../../title-el";
import { useEffect, useState } from "react";
import { useRoomContext } from "../../room/room-context";
import { UserMinimalType, WorkspaceUserType } from "@/types/user";
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";

type Props = {
  rooms: WorkspaceRoomShortType[];
  workspace_id: number;
  selected_room_id?: number;
};

type LeftJoinType = {
  room_id: number;
  user: UserMinimalType;
};

export default function WorkspaceRooms({
  workspace_id,
  rooms,
  selected_room_id,
}: Props) {
  const { workpaceUsers } = useRoomContext();
  const [participants, setParticipants] = useState<WorkspaceUserType[]>([]);

  useEffect(() => {
    setParticipants(workpaceUsers ?? []);
  }, [workpaceUsers]);

  useSocket("userLeftFromRoom", (data: LeftJoinType) => {
    setParticipants((prev) => {
      return prev.map((x) => {
        if (x.id === data.user.id) {
          x.room_id = data.room_id;
        }

        return x;
      });
    });
  });

  useSocket("userJoinedToRoom", (data: LeftJoinType) => {
    setParticipants((prev) => {
      return prev.map((x) => {
        if (x.id === data.user.id) {
          x.room_id = data.room_id;
        }

        return x;
      });
    });
  });

  if (rooms.length === 0) return null;

  return (
    <TitleEl title='Rooms'>
      {rooms.map((room) => {
        return (
          <WorkspaceRoom
            selected_room_id={selected_room_id}
            key={room.id}
            workspace_id={workspace_id}
            room={room}
            participants={participants.filter(
              (x) => x.room_id === room.id && x.status === "online"
            )}
          />
        );
      })}
    </TitleEl>
  );
}
