import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import { useLocalParticipant } from "@livekit/components-react"
import { Track } from "livekit-client"
import { Video, VideoOff } from "lucide-react"
import { useRoomHolder } from "../../.."

export default function VideoButtonTool() {
  const { enableVideoAccess, disableVideoAccess, stream_loading } =
    useRoomHolder()

  const { localParticipant } = useLocalParticipant()

  const videoTrack = localParticipant.getTrackPublication(Track.Source.Camera)

  const track = videoTrack?.track

  const isUpstreamPaused = videoTrack?.isMuted ?? true

  const toggleUpstream = async () => {
    if (!track) {
      return localParticipant.setCameraEnabled(true), enableVideoAccess()
    }
    if (isUpstreamPaused) {
      enableVideoAccess()
      track.unmute()
    } else {
      disableVideoAccess()
      track.mute()
      track.stop()
    }
  }

  let title = "Video Off"

  if (track?.isMuted) title = "Video on"

  return (
    <CotopiaTooltip title={title}>
      <CotopiaIconButton
        disabled={stream_loading}
        className="text-black"
        onClick={toggleUpstream}
      >
        {isUpstreamPaused ? <VideoOff size={20} /> : <Video size={20} />}
      </CotopiaIconButton>
    </CotopiaTooltip>
  )
}
