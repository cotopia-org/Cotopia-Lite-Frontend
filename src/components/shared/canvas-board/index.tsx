// Canvas.tsx
import React, { useEffect, useRef, useState } from "react";
import UserSessions from "../room/sessions";
import ReactFlowHandler from "./react-flow-handler";
import {
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useTracks,
} from "@livekit/components-react";
import { RoomEvent, Track } from "livekit-client";
import FullLoading from "../full-loading";

const Canvas: React.FC = () => {
  const [init, setInit] = useState(false);

  const [track, setTrack] = useState<TrackReferenceOrPlaceholder>();

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    {
      updateOnlyOn: [
        RoomEvent.ActiveSpeakersChanged,
        RoomEvent.Reconnected,
        RoomEvent.Reconnecting,
        RoomEvent.MediaDevicesChanged,
        RoomEvent.LocalTrackPublished,
        RoomEvent.TrackUnsubscribed,
      ],
      onlySubscribed: true,
    }
  );

  useEffect(() => {
    if (tracks.length === 0) return;

    if (init === true) return;
    setTrack(tracks?.[0]);

    setInit(true);

    const t = setTimeout(() => {
      setTrack(undefined);
    }, 1000);

    return () => clearTimeout(t);
  }, [tracks, init]);

  // if (init === false) return <FullLoading />;

  return (
    <div id='canvas-board' className='w-screen h-[1080px]'>
      <TrackRefContext.Provider value={track}>
        <UserSessions>
          <ReactFlowHandler tracks={tracks} />
        </UserSessions>
      </TrackRefContext.Provider>
    </div>
  );
};

export default Canvas;
