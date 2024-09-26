import FullLoading from "@/components/shared/full-loading";
import { useRoomContext } from "@/components/shared/room/room-context";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { UserMinimalType } from "@/types/user";
import React from "react";
import UserCard from "./card";
import NotFound from "@/components/shared/layouts/not-found";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import UserList from "@/components/shared/user-selector/list";

type Props = {
  search?: string;
  onSelect: (item: UserMinimalType) => void;
  showNotFound?: boolean;
};

export default function Users({
  search,
  onSelect,
  showNotFound = true,
}: Props) {
  const { user } = useProfile();

  const { data, isLoading } = useApi<FetchDataType<UserMinimalType[]>>(
    `/users/search`,
    {
      method: "POST",
      data: {
        search,
      },
      key: `/users/search/${search}`,
      isFetch: search !== "",
    }
  );
  const users = data !== undefined ? data?.data : [];

  if (isLoading) return <FullLoading className='py-2' />;

  let finalUsers = [...users];

  finalUsers = finalUsers.filter((x) => x.id !== user?.id);

  if (finalUsers.length === 0 && showNotFound)
    return <NotFound title='No users found!' />;

  return <UserList items={finalUsers} onPick={onSelect} />;
}
