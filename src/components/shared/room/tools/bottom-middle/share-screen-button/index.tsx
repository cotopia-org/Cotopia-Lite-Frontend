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

  const stopScreenShare = useCallback(() => {
    if (screenTrack) {
      localParticipant.unpublishTrack(screenTrack);
      screenTrack.stop();
      setScreenTrack(null);
    }
  }, [room, screenTrack]);

  return (
    <CotopiaIconButton className='text-black' onClick={startScreenShare}>
      <ScreenShare size={20} />
    </CotopiaIconButton>
  );
}
