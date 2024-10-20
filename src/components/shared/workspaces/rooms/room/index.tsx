import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import CotopiaButton from "@/components/shared-ui/c-button";
import ParticipantsWithPopover from "@/components/shared/participants/with-popover";
import { WorkspaceRoomJoinType, WorkspaceRoomShortType } from "@/types/room";
import { Cast } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteRoom from "./delete-room";
import { UserMinimalType, WorkspaceUserType } from "@/types/user";
import { uniqueById, urlWithQueryParams } from "@/lib/utils";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import useSetting from "@/hooks/use-setting";
import { playSoundEffect } from "@/lib/sound-effects";
import { _BUS } from "@/app/const/bus";
import useLoading from "@/hooks/use-loading";

type Props = {
  room: WorkspaceRoomShortType;
  workspace_id: number;
  selected_room_id?: number;
  participants: WorkspaceUserType[];
};

export default function WorkspaceRoom({
  workspace_id,
  room,
  selected_room_id,
  participants,
}: Props) {
  const { sounds } = useSetting();

  const router = useRouter();

  const socket = useSocket();

  const { startLoading, stopLoading, isLoading } = useLoading();

  const joinRoomHandler = async () => {
    if (!socket) return;

    if (selected_room_id !== room.id) {
      startLoading();
      socket.emit("joinedRoom", room.id, () => {
        axiosInstance
          .get<FetchDataType<WorkspaceRoomJoinType>>(`/rooms/${room.id}/join`)
          .then((res) => {
            const livekitToken = res.data.data.token; //Getting livekit token from joinObject

            stopLoading();

            if (sounds.userJoinLeft) playSoundEffect("joined");

            if (livekitToken) {
              router.push(
                urlWithQueryParams(
                  `/workspaces/${workspace_id}/rooms/${room.id}`,
                  { token: livekitToken, isSwitching: true }
                )
              );

              return;
            }
          })
          .catch((err) => {
            stopLoading();
          });
      });
    }
  };

  const isSelected = selected_room_id ? room?.id === selected_room_id : false;

  let clss = "!justify-start !text-left flex-1";
  if (isSelected) clss += ` !bg-black/10 !text-black`;

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex flex-row items-center justify-between gap-x-2'>
        <CotopiaButton
          onClick={joinRoomHandler}
          className={clss}
          variant={isSelected ? "default" : "ghost"}
          startIcon={<Cast className='mr-2' size={16} />}
          disabled={isLoading}
          loading={isLoading}
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
