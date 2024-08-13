import CotopiaButton from "@/components/shared-ui/c-button";
import { useEffect, useState } from "react";
import Video from "./video";
import useLoading from "@/hooks/use-loading";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { WorkspaceRoomJoinType } from "@/types/room";
import { useRoomContext } from "../room-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import { playSoundEffect } from "@/lib/sound-effects";

type Props = {
  onChecked: () => void;
  joinLoading?: boolean;
};
export default function CheckPermissions({ onChecked }: Props) {
  const socket = useSocket();

  const { room_id, workspace_id } = useRoomContext();

  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setAudioPermission(true);
        setAudioStream(stream);
      } catch (err) {
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setAudioPermission(false);
          }
        }
      }
    };

    getPermissions();
  }, []);

  const router = useRouter();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleJoin = async () => {
    startLoading();

    const res = await axiosInstance.get<FetchDataType<WorkspaceRoomJoinType>>(
      `/rooms/${room_id}/join`
    );

    //Join user to the room by socket request
    if (socket) socket.emit("joinedRoom", room_id);

    const livekitToken = res.data.data.token; //Getting livekit token from joinObject

    playSoundEffect("joined");

    if (livekitToken) {
      router.push(
        `/workspaces/${workspace_id}/rooms/${room_id}?token=${livekitToken}`
      );
      if (onChecked) onChecked();
      stopLoading();
      return;
    }

    //It means we don't have livekit token
    toast.error(`Livekit token doesn't exist!`);

    stopLoading();
  };

  return (
    <div className='w-[564px] max-w-full mx-auto my-16 flex flex-col items-center gap-y-4 '>
      <div className='w-full'>
        <Video />
      </div>
      <CotopiaButton
        loading={isLoading}
        onClick={handleJoin}
        className='bg-blue-500 min-w-[100px]'
      >
        Join Now
      </CotopiaButton>
    </div>
  );
}
