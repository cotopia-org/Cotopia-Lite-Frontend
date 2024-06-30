import FullLoading from "@/components/shared/full-loading";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { UserMinimalType } from "@/types/user";
import React from "react";
import NotFound from "@/components/shared/layouts/not-found";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import UserCard from "../users/card";
import { DirectType } from "@/types/direct";

type Props = {
  search?: string;
  onSelect: (item: DirectType) => void;
};

export default function Directs({ search, onSelect }: Props) {
  const { user } = useProfile();

  const { data, isLoading } =
    useApi<FetchDataType<DirectType[]>>(`/users/directs`);

  const directs = data !== undefined ? data?.data : [];

  if (isLoading || data === undefined) return <FullLoading />;

  let finalDirects = [...directs];

  if (search)
    finalDirects = finalDirects.filter((x) => {
      const allParticipantsUsername = x.participants
        .map((x) => x.username)
        .join(" ");
      const allParticipantsName = x.participants.map((x) => x.name).join(" ");

      return (
        new RegExp(search, "i").test(`/${allParticipantsUsername}/`) ||
        new RegExp(search, "i").test(`/${allParticipantsName}/`)
      );
    });

  if (finalDirects.length === 0) return <NotFound title='No users found!' />;

  return (
    <div className='flex flex-col gap-y-4'>
      {finalDirects.map((item, key) => (
        <UserCard
          key={key}
          user={
            item.participants.find((x) => x.id !== user?.id) as UserMinimalType
          }
          latestMessage={"hello"}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}
