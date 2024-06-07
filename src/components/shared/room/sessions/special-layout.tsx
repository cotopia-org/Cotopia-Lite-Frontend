import { isScreenShareExist } from "@/lib/utils";
import {
  TrackRefContext,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Children, ReactNode, cloneElement, isValidElement } from "react";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
  children: ReactNode;
};

const useExcludeShareScreenTrack = (tracks: TrackReferenceOrPlaceholder[]) => {
  let finalTracks = [];
  for (let item of tracks) {
    if (item.source !== Track.Source.ScreenShare) {
      finalTracks.push(item);
    }
  }
  return finalTracks;
};

export const cloneSingleChild = (
  children: ReactNode | ReactNode[],
  props?: Record<string, any>,
  key?: any
) => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && Children.only(children)) {
      return cloneElement(child, { ...props, key });
    }
  });
};

const SpcialLayout = ({ tracks, children }: Props) => {
  let finalTracks: TrackReferenceOrPlaceholder[] = [...tracks];

  //exclude shareScreen track from all tracks
  const excludedTracks = useExcludeShareScreenTrack(finalTracks);

  const { hasShareScreen, shareScreenTrack } = isScreenShareExist(finalTracks);

  let colClss = "animate-show-content col-span-12";

  if (excludedTracks.length > 0 && !hasShareScreen) {
    colClss += " md:!col-span-6";
  }

  let content = (
    <>
      {finalTracks.map((track, key) => {
        return (
          <div className='circle w-auto' key={key}>
            <TrackRefContext.Provider value={track}>
              {cloneSingleChild(children)}
            </TrackRefContext.Provider>
          </div>
        );
      })}
    </>
  );

  if (excludedTracks.length > 0 && hasShareScreen) {
    content = (
      <>
        <div className='share-screen fixed right-[40%] bottom-[24%]'>
          <div
            className={
              "w-[400px] h-[300px] [&_.rounded-full]:!w-full [&_.rounded-full]:!h-full [&_.rounded-full]:!rounded-md"
            }
            // key={getTrackReferenceId(shareScreenTrack) ?? "-"}
            // key={}
          >
            <TrackRefContext.Provider value={shareScreenTrack}>
              {cloneSingleChild(children)}
            </TrackRefContext.Provider>
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

// const trackPropsEqual = (prevProps: Props, nextProps: Props) => {
//   if (prevProps.tracks.length !== nextProps.tracks.length) {
//     return false
//   } else {
//     return true
//   }
// }

export default SpcialLayout;
