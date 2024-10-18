import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import { _BUS } from "@/app/const/bus";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { doCirclesMeet } from "@/lib/utils";
import { TrackReference, VideoTrack } from "@livekit/components-react";
import { Expand, Maximize2, Minimize, Minimize2, X } from "lucide-react";
import { ReactNode, useState } from "react";
import { dispatch } from "use-bus";
import { useRoomContext } from "../../room-context";
import useKeyPress from "@/hooks/use-key-press";
import { createPortal } from "react-dom";
import { NodeResizeControl, NodeResizer, useReactFlow } from "@xyflow/react";
import { __VARS } from "@/app/const/vars";
import { SquareArrowOutDownRight } from "lucide-react";

const INIT_WIDTH = 200;
const INIT_HEIGHT = 100;

type Props = {
  track: TrackReference;
  id: string;
};
export default function ScreenShareCard({ track, id }: Props) {
  const socket = useSocket();

  const rf = useReactFlow();

  const shareScreenNode = rf?.getNode(id);

  let sh_screen_w = shareScreenNode?.measured?.width ?? undefined;
  let sh_screen_h = shareScreenNode?.measured?.height ?? undefined;

  const has_up_dimensions = sh_screen_w && sh_screen_h;

  if (has_up_dimensions) {
    sh_screen_w = +INIT_WIDTH;
  }
  if (has_up_dimensions) {
    sh_screen_h = +INIT_HEIGHT;
  }

  const { room } = useRoomContext();

  const { user } = useProfile();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  let clss =
    "relative transition-all [&_.actions]:hover:opacity-100 [&_.actions]:hover:visible";

  if (isFullScreen) {
    clss += ` !fixed bg-black !w-screen !h-screen top-0 left-0 bottom-0 right-0 z-[1000] [&_video]:w-full [&_video]:h-full`;
  } else if (isExpanded) {
    clss += ` fixed !w-[1200px] !h-[480px]`;
  }

  const liveKitIdentity = track?.participant?.identity;

  const targetUser = room?.participants?.find(
    (a) => a.username === liveKitIdentity
  );

  const myTargetUser = room?.participants?.find(
    (a) => a.username === user.username
  );

  const myScreenShare = liveKitIdentity === user?.username;

  const { meet } = doCirclesMeet(myTargetUser, targetUser);

  const handleStopShareScreen = () => dispatch(_BUS.stopMyScreenSharing);

  useKeyPress("Escape", () => setIsFullScreen(false));

  const videoContent = <VideoTrack trackRef={track} />;

  const resizeShScreenHandler = (measure: {
    width: number;
    height: number;
  }) => {
    if (!socket || !shareScreenNode?.data?.draggable) return;
    let new_width = measure.width;
    let new_height = measure.height;
    const new_size = `${new_width},${new_height}`;
    const sendingObject = {
      room_id: room?.id,
      size: new_size,
    };
    socket.emit("updateShareScreenSize", sendingObject);
    dispatch({
      type: _BUS.changeScreenShareSize,
      data: {
        size: new_size,
      },
    });
  };

  const cardWrapper = (children: ReactNode) => {
    return (
      <div className={clss}>
        <div className='actions absolute top-4 left-4 flex flex-row items-center gap-x-2 opacity-0 invisible transition-all'>
          <CotopiaIconButton
            className='text-black/60 z-10'
            onClick={() => setIsFullScreen((prev) => !prev)}
          >
            {isFullScreen ? <Minimize2 /> : <Maximize2 />}
          </CotopiaIconButton>
          <CotopiaIconButton
            className='text-black/60 z-10'
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? <Minimize /> : <Expand />}
          </CotopiaIconButton>
          {!!myScreenShare && (
            <CotopiaIconButton
              className='text-black/60 z-10'
              onClick={handleStopShareScreen}
            >
              <X />
            </CotopiaIconButton>
          )}
        </div>
        {children}
      </div>
    );
  };

  let content = cardWrapper(videoContent);

  let resizerBullet = (
    <div
      className={`resizer w-full h-full bg-white shadow-lg rounded-full z-[2] flex items-center justify-center cursor-nwse-resize`}
    >
      <SquareArrowOutDownRight size={32} />
    </div>
  );

  if (!isFullScreen && !isExpanded) {
    content = cardWrapper(
      <div className=' [&_.resizer]:opacity-0 [&_.resizer]:hover:opacity-100 rounded-lg overflow-hidden'>
        <NodeResizer minWidth={sh_screen_w} minHeight={sh_screen_h} />

        <NodeResizeControl
          onResizeEnd={(_, p) => {
            resizeShScreenHandler(p);
          }}
          style={{
            background: "transparent",
            border: "none",
            width: 64,
            height: 64,
          }}
          position='bottom-right'
          keepAspectRatio
        >
          {resizerBullet}
        </NodeResizeControl>
        {videoContent}
      </div>
    );
  }

  if (!meet) return;

  return isFullScreen
    ? createPortal(content, document.getElementById("portal") as any)
    : content;
}
