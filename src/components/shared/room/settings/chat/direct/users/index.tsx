import FullLoading from "@/components/shared/full-loading";
import { useRoomContext } from "@/components/shared/room/room-context";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { UserMinimalType } from "@/types/user";
import React from "react";
import UserCard from "./card";
import NotFound from "@/components/shared/layouts/not-found";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";

type Props = {
  search?: string;
  onSelect: (item: UserMinimalType) => void;
};

export default function Users({ search, onSelect }: Props) {
  const { user } = useProfile();

  const { room_id } = useRoomContext();

  const { data, isLoading } = useApi<FetchDataType<UserMinimalType[]>>(
    `/workspaces/${room_id}/users`
  );

  const users = data !== undefined ? data?.data : [];

  if (isLoading) return <FullLoading />;

  let finalUsers = [...users];

  if (search)
    finalUsers = finalUsers.filter(
      (x) => x.name?.includes(search) || x?.username?.includes(search)
    );

  finalUsers = finalUsers.filter((x) => x.id !== user?.id);

  if (finalUsers.length === 0) return <NotFound title='No users found!' />;

  return (
    <div className='flex flex-col gap-y-4'>
      {finalUsers.map((item, key) => (
        <UserCard
          key={key}
          user={item}
          latestMessage={"hello"}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}
