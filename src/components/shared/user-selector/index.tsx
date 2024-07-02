import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { UserMinimalType } from "@/types/user";
import UserList from "./list";
import { ReactNode, useEffect, useState } from "react";
import CotopiaInput from "@/components/shared-ui/c-input";
import FullLoading from "../full-loading";

type Props = {
  onPick?: (item: UserMinimalType) => void;
  afterTitle?: ReactNode;
  defaultSelectedId?: number;
};

export default function UserSelector({
  onPick,
  afterTitle,
  defaultSelectedId,
}: Props) {
  const [selected, setSelected] = useState<UserMinimalType>();
  useEffect(() => {
    if (defaultSelectedId === undefined) setSelected(undefined);
  }, [defaultSelectedId]);

  const [search, setSearch] = useState("");

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

  const items = data !== undefined ? data?.data : [];

  const handlePick = (item: UserMinimalType) => {
    setSearch("");
    setSelected(item);
    if (onPick) onPick(item);
  };

  let content = null;

  if (items.length > 0)
    content = (
      <UserList
        items={items}
        onPick={handlePick}
        defaultSelectedId={defaultSelectedId}
      />
    );

  if (items.length === 0 && data !== undefined)
    content = (
      <strong className='p-4 shadow-md rounded-lg text-sm'>{`Could not find a Cotopia account ${
        search ? `matching "${search}"` : ""
      }`}</strong>
    );

  if (isLoading) content = <FullLoading />;

  return (
    <div className='flex flex-col gap-y-4'>
      <p className='text-black/60'>Search by username, full name, or email</p>
      {!!afterTitle && afterTitle}
      {selected === undefined && (
        <CotopiaInput
          placeholder='Find people'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      )}
      {content}
    </div>
  );
}
