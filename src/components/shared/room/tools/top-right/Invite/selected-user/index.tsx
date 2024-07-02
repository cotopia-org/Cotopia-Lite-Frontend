import { UserMinimalType } from "@/types/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trash, UserIcon } from "lucide-react";
import { getUserFullname } from "@/lib/utils";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";

type Props = {
  user: UserMinimalType;
  onDelete: () => void;
};

export default function SelectedUser({ user, onDelete }: Props) {
  const userFullName = getUserFullname(user);

  return (
    <Alert>
      <UserIcon className='h-4 w-4' />
      <AlertTitle>{userFullName}</AlertTitle>
      <AlertDescription>
        {`You are inviting ${userFullName} to the room.`}
      </AlertDescription>
      <CotopiaIconButton className='absolute top-1 right-1' onClick={onDelete}>
        <Trash className='text-black/60' size={20} />
      </CotopiaIconButton>
    </Alert>
  );
}
