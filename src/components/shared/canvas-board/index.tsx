// Canvas.tsx
import React from "react";
import UserSessions from "../room/sessions";
import ReactFlowHandler from "./react-flow-handler";
import { TrackRefContext, useTracks } from "@livekit/components-react";
import { RoomEvent, Track } from "livekit-client";

const Canvas: React.FC = () => {
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

  return (
    <div className='w-[1920px] h-[1080px]'>
      <TrackRefContext.Provider value={tracks[0]}>
        <UserSessions>
          <ReactFlowHandler tracks={tracks} />
        </UserSessions>
      </TrackRefContext.Provider>
    </div>
  );
};

export default Canvas;
