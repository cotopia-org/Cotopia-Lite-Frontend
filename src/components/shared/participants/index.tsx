import { UserMinimalType, WorkspaceUserType } from "@/types/user";
import Avatars from "../avatars";
import { ReactNode } from "react";
type ParticipantType = WorkspaceUserType | UserMinimalType;

export type ParticipantsProps = {
  participants: ParticipantType[];
  customTitle?: (user: ParticipantType) => string;
  render?: (index: number, content: ReactNode) => ReactNode;
};

export default function Participants({
  participants,
  customTitle,
  render,
}: ParticipantsProps) {
  if (participants.length === 0) return;

  return (
    participants.length > 0 && (
      <div className='pb-4'>
        <Avatars
          items={participants.map((x) => ({
            src: x?.avatar?.url,
            title: x?.name ?? "",
            toolTipTitle:
              customTitle !== undefined ? customTitle(x) : undefined,
            render,
          }))}
          render={render}
        />
      </div>
    )
  );
}
