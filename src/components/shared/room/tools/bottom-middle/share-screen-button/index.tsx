import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { ScreenShare } from "lucide-react";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { useCallback, useState } from "react";
import {
  createLocalScreenTracks,
  createLocalVideoTrack,
  LocalVideoTrack,
  Track,
} from "livekit-client";
import useBus from "use-bus";
import { _BUS } from "@/app/const/bus";

export default function ShareScreenButtonTool() {
  const [screenTrack, setScreenTrack] = useState<any>(null);

  const room = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const startScreenShare = useCallback(async () => {
    if (!room) return;
    try {
      await room.localParticipant.setScreenShareEnabled(true);
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  }, [room]);

  const stopScreenShare = useCallback(async () => {
    try {
      await room.localParticipant.setScreenShareEnabled(false);
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  }, [room, screenTrack]);

  useBus(_BUS.stopMyScreenSharing, () => {
    stopScreenShare();
  });

  return (
    <CotopiaIconButton className='text-black' onClick={startScreenShare}>
      <ScreenShare size={20} />
    </CotopiaIconButton>
  );
}
