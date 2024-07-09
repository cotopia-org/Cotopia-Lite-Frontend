import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import DraggableComponent from "@/components/shared/draggable";
import { TrackReference, VideoTrack } from "@livekit/components-react";
import { Expand, Minimize } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  track: TrackReference;
};
export default function ScreenShareCard({ track }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  let clss = "w-[400px] h-[160px] relative transition-all";
  if (isExpanded) clss += ` fixed !w-[1200px] !h-[480px]`;

  return (
    <DraggableComponent x={200} y={200}>
      <div className={clss}>
        <CotopiaIconButton
          className='absolute top-4 left-4 text-black/60 z-10'
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? <Minimize /> : <Expand />}
        </CotopiaIconButton>
        <VideoTrack trackRef={track} />
      </div>
    </DraggableComponent>
  );
}
