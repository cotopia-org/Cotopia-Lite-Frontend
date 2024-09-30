import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import { useLocalParticipant } from "@livekit/components-react"
import { Track } from "livekit-client"
import { Mic, MicOff } from "lucide-react"
import { useRoomHolder } from "../../.."

export default function VoiceButtonTool() {
  const { enableAudioAccess, disableAudioAccess, stream_loading } =
    useRoomHolder()
  const { localParticipant } = useLocalParticipant()
  const voiceTrack = localParticipant.getTrackPublication(
    Track.Source.Microphone
  )
  const track = voiceTrack?.track
  const isMuted = voiceTrack?.isMuted ?? true
  const toggleMute = async () => {
    if (!track) {
      return
    }
    if (track.isMuted) {
      track.unmute()
      enableAudioAccess()
    } else {
      track.mute()
      track.stop()
      disableAudioAccess()
    }
  }

  let title = "Mic Off"

  if (track?.isMuted) title = "Mic on"

  return (
    <CotopiaTooltip title={title}>
      <CotopiaIconButton
        disabled={stream_loading}
        className="text-black"
        onClick={toggleMute}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </CotopiaIconButton>
    </CotopiaTooltip>
  )
}
