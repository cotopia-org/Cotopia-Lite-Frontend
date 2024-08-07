import CotopiaButton from "@/components/shared-ui/c-button";
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

  return (
    <CotopiaButton
      onClick={joinRoomHandler}
      className='!justify-start !text-left'
      variant={isSelected ? "default" : "ghost"}
    >
      <div>
        <Cast className='mr-2' size={16} />
      </div>
      {room.title}
    </CotopiaButton>
  );
}
