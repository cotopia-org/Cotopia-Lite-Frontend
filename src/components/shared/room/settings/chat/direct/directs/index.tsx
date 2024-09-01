import { UserMinimalType } from "@/types/user";
import React from "react";
import NotFound from "@/components/shared/layouts/not-found";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import UserCard from "../users/card";
import { DirectType } from "@/types/direct";
import { useAppSelector } from "@/store/redux/store";

type Props = {
  search?: string;
  onSelect: (item: DirectType) => void;
  directs: DirectType[];
};

export default function Directs({ search, onSelect, directs }: Props) {
  const { user } = useProfile();

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
      {finalDirects.map((item, key) => {
        let defaultMessage = item.last_message;
        return (
          <UserCard
            key={key}
            user={
              item.participants.find(
                (x) => x.id !== user?.id
              ) as UserMinimalType
            }
            defaultLatest={defaultMessage}
            direct={item}
            onClick={() => onSelect(item)}
          />
        );
      })}
    </div>
  );
}
