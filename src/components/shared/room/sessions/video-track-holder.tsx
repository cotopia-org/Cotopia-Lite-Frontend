import { useTrack } from "@livekit/components-react";
import { Track } from "livekit-client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  trackReference: any;
};

const VideoTrackHolder = ({ children, trackReference }: Props) => {
  const { track } = useTrack({
    participant: trackReference.participant as any,
    publication: trackReference.publication as any,
    source: trackReference.source as any,
  });

  let isScreenShareEnabled = trackReference.participant?.isScreenShareEnabled;

  let defaultClss =
    "relative flex items-center justify-center h-[300px] sm:h-[300px] md:h-[500px] lg:h-[600px] w-full overflow-hidden bg-slate-800/40 rounded-lg";

  if (!!isScreenShareEnabled) {
    if (!!track?.source) {
      if (track.source === Track.Source.Camera) {
        defaultClss += " !h-[210px] !lg:h-[210px]";
      }
    }
  }

  return <div className={defaultClss}>{children}</div>;
};

export default VideoTrackHolder;
