import { UserMinimalType } from "@/types/user";
import UserCover from "./cover";
import SendingDirect from "./sending-direct";
import { createContext, useContext } from "react";
import UserDate from "./user-date";

type Props = {
  user: UserMinimalType;
};

const UserDetailContext = createContext<{ user?: UserMinimalType }>({
  user: undefined,
});
export const useUserDetail = () => useContext(UserDetailContext);

export default function Details({ user }: Props) {
  return (
    <UserDetailContext.Provider value={{ user }}>
      <div className='w-full max-w-full flex flex-col select-none'>
        <UserCover />
        <div className='p-4 pt-0 flex flex-col gap-y-2'>
          <div className='flex flex-col'>
            <strong data-testid='username-detail-card' className='capitalize'>
              {user.name}
            </strong>
            <div className='flex flex-row items-center justify-between'>
              <span className='text-xs font-light'>{user.username}</span>
              <UserDate />
            </div>
          </div>
          <SendingDirect />
        </div>
      </div>
    </UserDetailContext.Provider>
  );
}
