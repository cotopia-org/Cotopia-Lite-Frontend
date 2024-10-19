import { UserMinimalType, WorkspaceUserType } from "@/types/user";
import { ReactNode } from "react";
import CotopiaPopover from "@/components/shared-ui/c-popover";
import Details from "./details";

type Props = {
  user: UserMinimalType | WorkspaceUserType;
  children: ReactNode;
  roomId?: number;
};
export default function ParticipantDetails({ user, roomId, children }: Props) {
  return (
    <CotopiaPopover
      trigger={children}
      contentClassName='p-0 overflow-hidden border-0 m-0 shadow-md'
    >
      <Details roomId={roomId} user={user} />
    </CotopiaPopover>
  );
}
