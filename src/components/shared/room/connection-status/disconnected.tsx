"use client";

import NotFound from "../../layouts/not-found";
import { RotateCcw, Unlink } from "lucide-react";
import CotopiaButton from "@/components/shared-ui/c-button";
import useKeyPress from "@/hooks/use-key-press";
import { __VARS } from "@/app/const/vars";
import { useRoomContext as CotopiaRoomContext } from "../room-context";
import { useRoomContext } from "@livekit/components-react";

export default function Disconnected() {
  const room = useRoomContext();

  const { livekit_token } = CotopiaRoomContext();

  const onReload = () => {
    if (!livekit_token) return;
    if (!__VARS.serverUrl) return;

    room.connect(__VARS.serverUrl, livekit_token);
  };

  useKeyPress("Escape", onReload);

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
