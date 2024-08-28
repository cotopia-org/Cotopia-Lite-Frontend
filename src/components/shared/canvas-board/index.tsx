// Canvas.tsx
import React, { createContext, useCallback, useContext, useState } from "react";
import UserSessions from "../room/sessions";
import ReactFlowHandler from "./react-flow-handler";
// import { useRoomContext } from "../room/room-context";
import { Viewport } from "@xyflow/react";

// const CanvasContext = createContext<{
//   viewport?: Viewport;
//   handleChangeViewport: (vp: Viewport) => void;
// }>({
//   viewport: undefined,
//   handleChangeViewport: (item) => {},
// });

// export const useCanvas = () => useContext(CanvasContext);

const Canvas: React.FC = () => {
  // const [viewport, setViewport] = useState<Viewport>();
  // const handleChangeViewport = useCallback(
  //   (vp: Viewport) => setViewport(vp),
  //   []
  // );

  // const { room } = useRoomContext();

  return (
    <div className='w-[1920px] h-[1080px]'>
      <UserSessions>
        {(tracks) => <ReactFlowHandler tracks={tracks} />}
      </UserSessions>
    </div>
  );

  // return (
  // <CanvasContext.Provider value={{ handleChangeViewport, viewport }}>
  {
    /* <div
        style={{
          width: 3000,
          height: 3000,
          backgroundColor: "#eeee",
          backgroundImage: `url(${room?.background?.url})`,
          backgroundPosition: viewport
            ? `${viewport.x}px ${viewport.y}px`
            : "0,0",
          backgroundSize: viewport
            ? `${3000 * viewport.zoom}px ${3000 * viewport.zoom}px`
            : "cover",
          transition: "0.05s all",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        
      </div> */
  }

  {
    /* </CanvasContext.Provider> */
  }
  // );
};

export default Canvas;
