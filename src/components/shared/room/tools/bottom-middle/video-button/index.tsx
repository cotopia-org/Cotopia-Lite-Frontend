import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import { Video, VideoOff } from "lucide-react";
import { useRoomContext } from "../../../room-context";
import { useRoomHolder } from "../../..";

export default function VideoButtonTool() {
  const { mediaPermissions, changeMediaPermission } = useRoomHolder();

  const { changePermissionState } = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const voiceTrack = localParticipant.getTrackPublication(Track.Source.Camera);

  const track = voiceTrack?.track;

  const isUpstreamPaused = voiceTrack?.isMuted ?? true;

  const toggleUpstream = async () => {
    if (!track) {
      return;
    }

    if (isUpstreamPaused) {
      changeMediaPermission({
        ...mediaPermissions,
        video: true,
      });

      track.unmute();
      changePermissionState("video", true);
    } else {
      changeMediaPermission({
        ...mediaPermissions,
        video: false,
      });

      track.mute();
      track.stop();
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
