import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useLocalParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import { Video, VideoOff } from "lucide-react";

export default function VideoButtonTool() {
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
    } else {
      track.mute();
    }
  };

  return (
    <CotopiaIconButton className='text-black' onClick={toggleUpstream}>
      {isUpstreamPaused ? <VideoOff size={20} /> : <Video size={20} />}
    </CotopiaIconButton>
  );
}
