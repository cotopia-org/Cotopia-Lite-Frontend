import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useLocalParticipant, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { Mic, MicOff } from "lucide-react";

export default function VoiceButtonTool() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  console.log("tracks", tracks);

  const { localParticipant } = useLocalParticipant();

  const voiceTrack = localParticipant.getTrackPublication(
    Track.Source.Microphone
  );

  const track = voiceTrack?.track;

  const isMuted = voiceTrack?.isMuted;

  const toggleMute = async () => {
    if (!track) {
      return;
    }

    if (track.isMuted) {
      track.unmute();
    } else {
      track.mute();
    }
  };

  return (
    <CotopiaIconButton className='text-black' onClick={toggleMute}>
      {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
    </CotopiaIconButton>
  );
}
