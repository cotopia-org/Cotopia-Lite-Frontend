import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { UserType } from "@/types/user";
import Username from "./username";
import Message from "./message";

type Props = {
  user: UserType;
  latestMessage?: string;
};
export default function UserCard({ user, latestMessage }: Props) {
  return (
    <div className='flex flex-row items-center gap-x-4'>
      <CotopiaAvatar
        src={user?.avatar?.url ?? undefined}
        title={user?.name?.[0] ?? undefined}
      />
      <div className='flex flex-col gap-y-2'>
        <Username username={user?.username} />
        {!!latestMessage && <Message message={latestMessage} />}
      </div>
    </div>
  );
}
