import React from "react";
import InviteButtonTool from "./Invite";
import MeetButtonTool from "./meet";
import UserActionsGroup from "./user-actions-group";
import ChatActionsGroup from "./chat-actions-group";

export default function TopRightTools() {
  return (
    <div className='flex flex-row items-center gap-x-2'>
      <InviteButtonTool />
      <MeetButtonTool />
      <UserActionsGroup />
      <ChatActionsGroup />
    </div>
  );
}
