import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { ScreenShare, X } from "lucide-react";
import { useRoomContext } from "@livekit/components-react";
import { useCallback, useEffect, useState } from "react";
import useBus from "use-bus";
import { _BUS } from "@/app/const/bus";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";

export default function ShareScreenButtonTool() {
  const room = useRoomContext();
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const checkIfScreenSharing = useCallback(() => {
    if (!room) return false;
    const tracks = room.localParticipant.videoTrackPublications;
    for (let [_, track] of tracks.entries()) {
      if (track.source === "screen_share") {
        return true; // Screen share is active
      }
    }
    return false; // No screen share track
  }, [room]);

  const stopScreenShare = useCallback(async () => {
    try {
      await room.localParticipant.setScreenShareEnabled(false);
      setIsScreenSharing(false); // Update state when screen sharing stops
    } catch (err) {
      console.error("Error stopping screen share:", err);
    }
  }, [room]);

  const toggleScreenShare = useCallback(async () => {
    if (!room) return;

    if (isScreenSharing) {
      return stopScreenShare();
    }

    try {
      await room.localParticipant.setScreenShareEnabled(true);
      setIsScreenSharing(true); // Update state when screen sharing starts
    } catch (err) {
      console.error("Error starting screen share:", err);
    }
  }, [room, isScreenSharing, stopScreenShare]);

  useBus(_BUS.stopMyScreenSharing, () => {
    stopScreenShare();
  });

  // Monitor changes in the room context to update the screen sharing status
  useEffect(() => {
    const screenSharingActive = checkIfScreenSharing();
    setIsScreenSharing(screenSharingActive);
  }, [room, checkIfScreenSharing]);

  return (
    <CotopiaTooltip
      title={isScreenSharing ? `Stop screen sharing` : `Share screen`}
    >
      <CotopiaIconButton className='text-black' onClick={toggleScreenShare}>
        {isScreenSharing ? <X size={20} /> : <ScreenShare size={20} />}
      </CotopiaIconButton>
    </CotopiaTooltip>
  );
}
