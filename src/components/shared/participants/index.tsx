import { UserMinimalType } from "@/types/user";
import Avatars from "../avatars";

type Props = {
  participants: UserMinimalType[];
};
export default function Participants({ participants }: Props) {
  if (participants.length === 0) return;

  return (
    participants.length > 0 && (
      <div className='pb-4'>
        <Avatars
          items={participants.map((x) => ({
            src: x?.avatar?.url,
            title: x?.name ?? "",
          }))}
        />
      </div>
    )
  );
}
