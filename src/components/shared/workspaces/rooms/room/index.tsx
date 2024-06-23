import CotopiaButton from "@/components/shared-ui/c-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { WorkspaceRoomJoinType, WorkspaceRoomType } from "@/types/room";
import { Cast } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  room: WorkspaceRoomType;
};

export default function WorkspaceRoom({ room }: Props) {
  const router = useRouter();

  const { startLoading, stopLoading, isLoading } = useLoading();

  const joinRoomHandler = async () => {
    startLoading();
    try {
      const res = await axiosInstance.get<FetchDataType<WorkspaceRoomJoinType>>(
        `/rooms/${room.id}/join`
      );

      const livekitToken = res.data.data.token; //Getting livekit token from joinObject

      if (livekitToken) {
        router.push(
          `/workspaces/${room.workspace_id}/rooms/${room.id}?token=${livekitToken}`
        );
        return;
      }

      //It means we don't have livekit token
      toast.error(`Livekit token doesn't exist!`);

      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  return (
    <CotopiaButton
      onClick={joinRoomHandler}
      disabled={isLoading}
      className='!justify-start !text-left'
      variant={"ghost"}
    >
      <div>
        <Cast className='mr-2' size={16} />
      </div>
      {room.title}
    </CotopiaButton>
  );
}
