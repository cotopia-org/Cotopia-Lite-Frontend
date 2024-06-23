import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { WorkspaceType } from "@/types/workspace";
import { MoreHorizontal } from "lucide-react";

import moment from "moment";
import Link from "next/link";
import WorkspaceAvatar from "./avatar";
import WorkspaceTitle from "./title";
import WorkspaceDate from "./date";
import WorkspaceActions from "./actions";
import { useSocket } from "@/app/(pages)/(protected)/(dashboard)/dashboard-wrapper";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  item: WorkspaceType;
};
export default function WorkspaceItem({ item }: Props) {
  const [localWorkspace, setLocalWorkspace] = useState<WorkspaceType>(item);

  let avatarTitle = "";
  if (item.title) avatarTitle = localWorkspace.title[0].toUpperCase();

  useSocket("workspaceUpdated", (data: any) => {
    if (data.id === item.id) {
      setLocalWorkspace(data);
    }
  });

  return (
    <Link
      href={`/workspaces/${localWorkspace.id}`}
      className='p-4 rounded-3xl bg-gray-50 hover:bg-gray-100 w-full flex flex-row items-center justify-between'
    >
      <div className='flex flex-row items-center gap-x-4'>
        <WorkspaceAvatar title={avatarTitle} />
        <div className='flex flex-col'>
          <WorkspaceTitle title={localWorkspace.title} />
          <WorkspaceDate date={localWorkspace.created_at ?? null} />
        </div>
      </div>
      <div>
        <WorkspaceActions item={localWorkspace} />
      </div>
    </Link>
  );
}
