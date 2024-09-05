import CotopiaButton from "@/components/shared-ui/c-button";
import Avatars from "@/components/shared/avatars";
import Participants from "@/components/shared/participants";
import { WorkspaceRoomShortType } from "@/types/room";
import { Cast } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  room: WorkspaceRoomShortType;
  workspace_id: number;
  selected_room_id?: number;
};

export default function WorkspaceRoom({
  workspace_id,
  room,
  selected_room_id,
}: Props) {
  const router = useRouter();

  const joinRoomHandler = async () => {
    router.push(`/workspaces/${workspace_id}/rooms/${room.id}`);
  };

  const isSelected = selected_room_id ? room?.id === selected_room_id : false;
  const participants = room?.participants ?? [];

  let clss = "!justify-start !text-left";
  if (isSelected) clss += ` !bg-black/10 !text-black`;

  return (
    <div className='flex flex-col gap-y-2'>
      <CotopiaButton
        onClick={joinRoomHandler}
        className={clss}
        variant={isSelected ? "default" : "ghost"}
        startIcon={<Cast className='mr-2' size={16} />}
      >
        {room.title}
      </CotopiaButton>
      <Participants participants={participants} />
    </div>
  );
}
