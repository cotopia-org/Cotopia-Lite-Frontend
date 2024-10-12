import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import CotopiaButton from "@/components/shared-ui/c-button";
import ParticipantsWithPopover from "@/components/shared/participants/with-popover";
import { WorkspaceRoomShortType } from "@/types/room";
import { Cast } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteRoom from "./delete-room";
import { useEffect, useState } from "react";
import { UserMinimalType } from "@/types/user";
import { uniqueById } from "@/lib/utils";

type Props = {
  room: WorkspaceRoomShortType;
  workspace_id: number;
  selected_room_id?: number;
};

type LeftJoinType = {
  room_id: number;
  user: UserMinimalType;
};

export default function WorkspaceRoom({
  workspace_id,
  room,
  selected_room_id,
}: Props) {
  const [participants, setParticipants] = useState<UserMinimalType[]>([]);
  useEffect(() => {
    if (room?.participants !== undefined) setParticipants(room.participants);
  }, [room?.participants]);

  useSocket(
    "userLeftFromRoom",
    (data: LeftJoinType) => {
      const { room_id: gotRoomId } = data;

      if (room.id === undefined) return;

      if (gotRoomId !== +room.id) return;

      setParticipants((prev) => prev.filter((x) => x.id !== data.user.id));
    },
    [room]
  );

  useSocket("userJoinedToRoom", (data: LeftJoinType) => {
    const { room_id: gotRoomId } = data;

    if (room.id === undefined) return;

    if (gotRoomId !== +room.id) return;

    setParticipants((prev) => [...prev, data.user]);
  });

  const socket = useSocket();
  const router = useRouter();

  const joinRoomHandler = async () => {
    if (selected_room_id !== room.id) {
      socket?.emit("leaveRoom");
      router.push(`/workspaces/${workspace_id}/rooms/${room.id}`);
    }
  };

  const isSelected = selected_room_id ? room?.id === selected_room_id : false;

  let clss = "!justify-start !text-left flex-1";
  if (isSelected) clss += ` !bg-black/10 !text-black`;

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex flex-row items-center justify-between gap-x-2'>
        <CotopiaButton
          onClick={() => joinRoomHandler()}
          className={clss}
          variant={isSelected ? "default" : "ghost"}
          startIcon={<Cast className='mr-2' size={16} />}
        >
          {room.title}
        </CotopiaButton>
        <DeleteRoom room={room} onDelete={() => {}} />
      </div>
      <ParticipantsWithPopover
        roomId={room.id}
        participants={uniqueById(participants) as UserMinimalType[]}
      />
    </div>
  );
}
