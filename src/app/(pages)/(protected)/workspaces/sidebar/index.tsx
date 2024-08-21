"use client";

import { useParams } from "next/navigation";
import WorkspaceRoomsHolder from "../[slug]/rooms";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function WorkspaceSidebar() {
  const { slug: workspace_id, room_id } = useParams();

  return (
    <div className='flex flex-col gap-y-4 bg-white min-h-screen p-4'>
      <a
        className={buttonVariants({
          variant: "outline",
        })}
        href={room_id ? `/workspaces/${workspace_id}` : `/dashboard`}
      >
        <ArrowLeft className='mr-2' size={16} />
        Back to dashboard
      </a>
      <WorkspaceRoomsHolder workspace_id={workspace_id as string} />
    </div>
  );
}
