import { WorkspaceUserType } from "@/types/user";
import Participants from "./participants";

type Props = {
  user: WorkspaceUserType;
};
export default function UserOverview({ user }: Props) {
  return (
    <div className='flex flex-row items-center gap-x-2'>
      <Participants className='!pb-0' participants={[user]} />
      <div className='flex flex-col'>
        <strong className='text-sm capitalize'>{user.name}</strong>
        <span className='text-xs'>{user.username}</span>
      </div>
    </div>
  );
}
