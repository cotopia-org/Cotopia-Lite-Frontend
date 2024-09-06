import { isScreenShareExist } from "@/lib/utils";
import {
  TrackRefContext,
  TrackReference,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Children, ReactNode, cloneElement, isValidElement } from "react";
import DraggableComponent from "../../draggable";
import ScreenShareCard from "../components/screen-share-card";

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

  let content = (
    <>
      {/* {finalTracks
        .filter((x) => x.source === Track.Source.ScreenShare)
        .map((track, key) => (
          <ScreenShareCard track={track as TrackReference} key={key} />
        ))} */}
      {finalTracks
        .filter((x) => x.source !== Track.Source.ScreenShare)
        .map((track, key) => {
          return (
            <TrackRefContext.Provider value={track} key={key}>
              {cloneSingleChild(children)}
            </TrackRefContext.Provider>
          );
        })}
    </>
  );

  return <>{content}</>;
};

export default SpcialLayout;
