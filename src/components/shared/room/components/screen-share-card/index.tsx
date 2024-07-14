import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { _BUS } from "@/app/const/bus";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import DraggableComponent from "@/components/shared/draggable";
import { TrackReference, VideoTrack } from "@livekit/components-react";
import { Expand, Maximize2, Minimize, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { dispatch } from "use-bus";

type Props = {
  track: TrackReference;
};
export default function ScreenShareCard({ track }: Props) {
  const { user } = useProfile();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  let clss = "w-[400px] h-[160px] relative transition-all";

  if (isFullScreen) {
    clss += ` !fixed bg-black w-screen h-screen top-0 left-0 bottom-0 right-0 z-[1000] [&_video]:w-full [&_video]:h-full`;
  } else if (isExpanded) {
    clss += ` fixed !w-[1200px] !h-[480px]`;
  }

  const myScreenShare = track?.participant?.identity === user?.username;

  const content = (
    <div className={clss}>
      <div className='absolute top-4 left-4 flex flex-row items-center gap-x-2'>
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
            onClick={() => dispatch(_BUS.stopMyScreenSharing)}
          >
            <X />
          </CotopiaIconButton>
        )}
      </div>
      <VideoTrack trackRef={track} />
    </div>
  );

  return isFullScreen ? (
    content
  ) : (
    <DraggableComponent x={200} y={200}>
      {content}
    </DraggableComponent>
  );
}
