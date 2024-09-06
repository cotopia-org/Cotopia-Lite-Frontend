// Canvas.tsx
import React from "react";
import UserSessions from "../room/sessions";
import ReactFlowHandler from "./react-flow-handler";

const Canvas: React.FC = () => {
  return (
    <div className='w-[1920px] h-[1080px]'>
      <UserSessions>
        {(tracks) => <ReactFlowHandler tracks={tracks} />}
      </UserSessions>
    </div>
  );
};

export default Canvas;
