// Canvas.tsx
import React from "react";
import UserSessions from "../room/sessions";
import ReactFlowHandler from "./react-flow-handler";
import { useRoomContext } from "../room/room-context";

const Canvas: React.FC = () => {
  const { room } = useRoomContext();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${room?.background?.url ?? ""})`,
        backgroundSize: "cover", // or 'contain', 'auto', etc.
        backgroundPosition: "30% 0%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <UserSessions>
        {(tracks) => <ReactFlowHandler tracks={tracks} />}
      </UserSessions>
    </div>
  );
};

export default Canvas;
