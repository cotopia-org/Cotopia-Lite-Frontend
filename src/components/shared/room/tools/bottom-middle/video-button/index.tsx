import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import { Video, VideoOff } from "lucide-react";
import { useRoomContext } from "../../../room-context";

export default function VideoButtonTool() {
  const { changePermissionState } = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const voiceTrack = localParticipant.getTrackPublication(Track.Source.Camera);

  const track = voiceTrack?.track;

  const isUpstreamPaused = voiceTrack?.isMuted;

  const toggleUpstream = async () => {
    if (!track) {
      return;
    }

    if (isUpstreamPaused) {
      track.unmute();
      changePermissionState("video", true);
    } else {
      track.mute();
      changePermissionState("video", false);
    }
  };

  let title = "Video Off";

  if (track?.isMuted) title = "Video on";

  return (
    <CotopiaTooltip title={title}>
      <CotopiaIconButton className='text-black' onClick={toggleUpstream}>
        {isUpstreamPaused ? <VideoOff size={20} /> : <Video size={20} />}
      </CotopiaIconButton>
    </CotopiaTooltip>
  );
}
