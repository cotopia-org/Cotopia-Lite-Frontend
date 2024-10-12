import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { doCirclesMeet } from "@/lib/utils"
import { TrackReference, VideoTrack } from "@livekit/components-react"
import { Expand, Maximize2, Minimize, Minimize2, X } from "lucide-react"
import { useState } from "react"
import { dispatch } from "use-bus"
import { useRoomContext } from "../../room-context"
import useKeyPress from "@/hooks/use-key-press"
import { createPortal } from "react-dom"
import ResizableWrapper from "@/components/shared/resizable-wrapper"

type Props = {
  track: TrackReference
}
export default function ScreenShareCard({ track }: Props) {
  const { room } = useRoomContext()

  const { user } = useProfile()

  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  let clss =
    "w-[400px] h-[160px] relative transition-all [&_.actions]:hover:opacity-100 [&_.actions]:hover:visible"

  if (isFullScreen) {
    clss += ` !fixed bg-black !w-screen !h-screen top-0 left-0 bottom-0 right-0 z-[1000] [&_video]:w-full [&_video]:h-full`
  } else if (isExpanded) {
    clss += ` fixed !w-[1200px] !h-[480px]`
  }

  const liveKitIdentity = track?.participant?.identity

  const targetUser = room?.participants?.find(
    (a) => a.username === liveKitIdentity
  )

  const myTargetUser = room?.participants?.find(
    (a) => a.username === user.username
  )

  const myScreenShare = liveKitIdentity === user?.username

  const { meet } = doCirclesMeet(myTargetUser, targetUser)

  const handleStopShareScreen = () => dispatch(_BUS.stopMyScreenSharing)

  useKeyPress("Escape", () => setIsFullScreen(false))

  if (!meet) return

  const videoContent = <VideoTrack trackRef={track} />

  let content = (
    <div className={clss}>
      <div className="actions absolute top-4 left-4 flex flex-row items-center gap-x-2 opacity-0 invisible transition-all">
        <CotopiaIconButton
          className="text-black/60 z-10"
          onClick={() => setIsFullScreen((prev) => !prev)}
        >
          {isFullScreen ? <Minimize2 /> : <Maximize2 />}
        </CotopiaIconButton>
        <CotopiaIconButton
          className="text-black/60 z-10"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? <Minimize /> : <Expand />}
        </CotopiaIconButton>
        {!!myScreenShare && (
          <CotopiaIconButton
            className="text-black/60 z-10"
            onClick={handleStopShareScreen}
          >
            <X />
          </CotopiaIconButton>
        )}
      </div>
      {!isFullScreen && !isExpanded ? (
        <ResizableWrapper>
          <div className=" rounded-lg overflow-hidden">{videoContent}</div>
        </ResizableWrapper>
      ) : (
        videoContent
      )}
    </div>
  )

  return isFullScreen
    ? createPortal(content, document.getElementById("portal") as any)
    : content
}
