"use client";

import { useParams } from "next/navigation";
import WorkspaceRoomsHolder from "../[slug]/rooms";

export default function WorkspaceSidebar() {
  const { slug: workspace_id, room_id } = useParams();

  return (
    <div className='flex flex-col gap-y-4 bg-white h-screen overflow-y-auto p-4'>
      <WorkspaceRoomsHolder workspace_id={workspace_id as string} />
    </div>
  );
}
