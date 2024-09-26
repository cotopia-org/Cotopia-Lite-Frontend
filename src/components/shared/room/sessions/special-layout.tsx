import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
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
  return <>{cloneSingleChild(children)}</>;
};

export default SpcialLayout;
