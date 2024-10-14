import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { doCirclesMeet } from "@/lib/utils"
import { TrackReference, VideoTrack } from "@livekit/components-react"
import { Expand, Maximize2, Minimize, Minimize2, X } from "lucide-react"
import { ReactNode, useCallback, useMemo, useState } from "react"
import { dispatch } from "use-bus"
import { useRoomContext } from "../../room-context"
import useKeyPress from "@/hooks/use-key-press"
import { createPortal } from "react-dom"
import { NodeResizeControl, useReactFlow } from "@xyflow/react"
import { __VARS } from "@/app/const/vars"
import { SquareArrowOutDownRight } from "lucide-react"

type Props = {
  track: TrackReference
  id: string
}
export default function ScreenShareCard({ track, id }: Props) {
  const socket = useSocket()

  const rf = useReactFlow()

  const shareScreenNode = rf?.getNode(id)

  console.log(shareScreenNode, "SHARESCREENNODE")

  const up_width = shareScreenNode?.data?.width
  const up_height = shareScreenNode?.data?.height

  const has_up_dimensions = up_width && up_height

  let sh_screen_w = shareScreenNode?.measured?.width ?? 500

  let sh_screen_h = shareScreenNode?.measured?.height ?? 280

  if (has_up_dimensions) {
    sh_screen_w = +up_width
  }
  if (has_up_dimensions) {
    sh_screen_h = +up_height
  }

  const { room } = useRoomContext()

  const { user } = useProfile()

  const [isFullScreen, setIsFullScreen] = useState(false)

  const [isExpanded, setIsExpanded] = useState(false)

  let clss =
    "relative transition-all [&_.actions]:hover:opacity-100 [&_.actions]:hover:visible"

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

  const videoContent = <VideoTrack trackRef={track} />

  const resizeShScreenHandler = (measure: {
    width: number
    height: number
  }) => {
    console.log(shareScreenNode, "SHARESCNODE")
    if (!socket || !shareScreenNode?.data?.draggable) return
    let new_width = measure.width
    let new_height = measure.height
    const new_size = `${new_width},${new_height}`
    const sendingObject = {
      room_id: room?.id,
      size: new_size,
    }
    socket.emit("updateShareScreenSize", sendingObject)
    dispatch({
      type: _BUS.changeScreenShareSize,
      data: {
        size: new_size,
      },
    })
  }

  const cardWrapper = (children: ReactNode) => {
    return (
      <div
        style={{
          width: sh_screen_w,
          height: sh_screen_h,
        }}
        className={clss}
      >
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
        {children}
      </div>
    )
  }

  let content = cardWrapper(videoContent)

  let resizerBullet = (
    <div
      className={`resizer w-full h-full absolute bottom-1 right-1  bg-white shadow-lg rounded-full z-[2] flex items-center justify-center cursor-nwse-resize`}
    >
      <SquareArrowOutDownRight size={14} />
    </div>
  )

  if (!isFullScreen && !isExpanded) {
    content = cardWrapper(
      <div className=" [&_.resizer]:opacity-0 [&_.resizer]:hover:opacity-100 rounded-lg overflow-hidden">
        <NodeResizeControl
          minHeight={200}
          minWidth={400}
          onResizeEnd={(_, p) =>
            resizeShScreenHandler({ width: p.width, height: p.height })
          }
          position="bottom-right"
          keepAspectRatio
          style={{
            minWidth: "21px",
            minHeight: "21px",
            background: "transparent",
            border: "none",
          }}
        >
          {resizerBullet}
        </NodeResizeControl>
        {videoContent}
      </div>
    )
  }

  if (!meet) return

  return isFullScreen
    ? createPortal(content, document.getElementById("portal") as any)
    : content
}
