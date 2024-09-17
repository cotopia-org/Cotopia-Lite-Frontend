import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { ScreenShare } from "lucide-react"
import { useRoomContext } from "@livekit/components-react"
import { useCallback } from "react"
import useBus from "use-bus"
import { _BUS } from "@/app/const/bus"

export default function ShareScreenButtonTool() {
  const room = useRoomContext()

  const stopScreenShare = useCallback(async () => {
    try {
      await room.localParticipant.setScreenShareEnabled(false)
    } catch (err) {
      console.error("Error sharing screen:", err)
    }
  }, [room])

  const toggleScreenShare = useCallback(async () => {
    if (!room) return
    let isScreenShareExist = false
    const tracks = room.localParticipant.videoTrackPublications
    for (let [_, track] of tracks.entries()) {
      if (track.source === "screen_share") isScreenShareExist = true
    }
    if (isScreenShareExist) return stopScreenShare()
    try {
      await room.localParticipant.setScreenShareEnabled(true)
    } catch (err) {
      console.error("Error sharing screen:", err)
    }
  }, [room])

  useBus(_BUS.stopMyScreenSharing, () => {
    stopScreenShare()
  })

  return (
    <CotopiaIconButton className="text-black" onClick={toggleScreenShare}>
      <ScreenShare size={20} />
    </CotopiaIconButton>
  )
}
