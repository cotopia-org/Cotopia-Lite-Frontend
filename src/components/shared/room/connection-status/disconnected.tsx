"use client";

import NotFound from "../../layouts/not-found";
import { RotateCcw, Unlink } from "lucide-react";
import CotopiaButton from "@/components/shared-ui/c-button";
import { __VARS } from "@/app/const/vars";
import { useRoomContext as CotopiaRoomContext } from "../room-context";
import { useRoomContext } from "@livekit/components-react";
import { useEffect } from "react";
import socket from "@/lib/socket";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { WorkspaceRoomJoinType } from "@/types/room";
import { playSoundEffect } from "@/lib/sound-effects";

export default function Disconnected() {
  const { token: userToken } = useProfile();

  const room = useRoomContext();

  const { livekit_token, room_id } = CotopiaRoomContext();

  const onReload = async () => {
    if (!livekit_token) return;
    if (!__VARS.serverUrl) return;

    if (userToken) {
      //Join to livekit
      room.connect(__VARS.serverUrl, livekit_token);
      //Join to backend socket
      socket.connect(__VARS.socketUrl, userToken);
      await axiosInstance.get<FetchDataType<WorkspaceRoomJoinType>>(
        `/rooms/${room_id}/join`
      );
    }
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      onReload();
    }, 2000);

    playSoundEffect("userGotClosed");

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='flex flex-col gap-y-4 !bg-background p-4 rounded-lg w-[400px] max-w-full py-8'>
      <NotFound
        title='You disconnected'
        desc='To connect again, please reload the page.'
        icon={<Unlink />}
        afterDesc={
          <CotopiaButton
            onClick={onReload}
            className='w-[100px]'
            startIcon={<RotateCcw size={16} />}
          >
            Reconnect
          </CotopiaButton>
        }
      />
    </div>
  );
}
