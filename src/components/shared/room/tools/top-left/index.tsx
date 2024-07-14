import React from "react";
import WorkspaceButton from "./workspace-button";

export default function TopLeftTools() {
  return (
    <div className='flex flex-row items-center gap-x-2'>
      <WorkspaceButton />
    </div>
  );
}
