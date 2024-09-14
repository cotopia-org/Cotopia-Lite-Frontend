import { UserMinimalType, WorkspaceUserType } from "@/types/user";
import Avatars from "../avatars";
import NotFound from "../layouts/not-found";

type ParticipantType = WorkspaceUserType | UserMinimalType;

type Props = {
  participants: ParticipantType[];
  customTitle?: (user: ParticipantType) => string;
};
export default function Participants({ participants, customTitle }: Props) {
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
          }))}
        />
      </div>
    )
  );
}
