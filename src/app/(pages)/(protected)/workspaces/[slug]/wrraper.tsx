"use client";

import DashboardLayoutMaker from "@/components/shared/layouts/dashboard";
import WorkspaceRooms from "./rooms";

type Props = {
  workspace_id: string;
};
export default function Wrapper({ workspace_id }: Props) {
  return (
    <DashboardLayoutMaker
      leftSidebar={<WorkspaceRooms workspace_id={workspace_id} />}
    >
      <WorkspaceRooms workspace_id={workspace_id} />
    </DashboardLayoutMaker>
  );
}
