import { isScreenShareExist } from "@/lib/utils";
import getTrackRefId from "@/types/get-track-ref-id";
import { getTrackReferenceId } from "@livekit/components-core";
import {
  TrackRefContext,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Children, ReactNode, cloneElement, isValidElement, memo } from "react";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
  children: ReactNode;
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

const useExcludeShareScreenTrack = (tracks: TrackReferenceOrPlaceholder[]) => {
  let finalTracks = [];
  for (let item of tracks) {
    if (item.source !== Track.Source.ScreenShare) {
      finalTracks.push(item);
    }
  }
  return finalTracks;
};

const CustomGridLayout = ({ tracks, children }: Props) => {
  let finalTracks: TrackReferenceOrPlaceholder[] = [...tracks];

  let gridClss =
    "grid w-full h-full relative grid-cols-12 p-10 gap-y-6 md:gap-x-6";
  //exclude shareScreen track from all tracks
  const excludedTracks = useExcludeShareScreenTrack(finalTracks);

  const { hasShareScreen, shareScreenTrack } = isScreenShareExist(finalTracks);

  //if we had just one participant:<SingleGridView/>

  //for two or more participants:<NormalGridView/>

  //for shareScreen view:<ShareScreenView/>

  let colClss = "animate-show-content col-span-12";

  if (excludedTracks.length > 0 && !hasShareScreen) {
    colClss += " md:!col-span-6";
  }

  let content = (
    <>
      {finalTracks.map((track) => {
        return (
          <div className={colClss} key={getTrackReferenceId(track)}>
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
        <div className='col-span-8'>
          <div className={colClss} key={getTrackRefId(shareScreenTrack)}>
            <TrackRefContext.Provider value={shareScreenTrack}>
              {cloneSingleChild(children)}
            </TrackRefContext.Provider>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-y-6 col-span-4'>
          {excludedTracks.map((track) => {
            return (
              <div className={colClss} key={getTrackRefId(track)}>
                <TrackRefContext.Provider value={track}>
                  {cloneSingleChild(children)}
                </TrackRefContext.Provider>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return <div className={gridClss}>{content}</div>;
};

// const trackPropsEqual = (prevProps: Props, nextProps: Props) => {
//   if (prevProps.tracks.length !== nextProps.tracks.length) {
//     return false
//   } else {
//     return true
//   }
// }

export default CustomGridLayout;
