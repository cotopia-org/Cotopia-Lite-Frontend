import { UserMinimalType } from "@/types/user";
import UserCardItem from "./item";

type Props = {
  items: UserMinimalType[];
  onPick?: (item: UserMinimalType) => void;
  defaultSelectedId?: number;
};
export default function UserList({ items, onPick, defaultSelectedId }: Props) {
  if (items.length === 0) return;

  return (
    <div className='py-2 flex flex-col rounded-md shadow-md overflow-hidden max-h-[300px] overflow-y-auto'>
      {items.map((user) => (
        <UserCardItem
          item={user}
          key={user.id}
          onPick={onPick}
          isSelected={defaultSelectedId === user?.id}
        />
      ))}
    </div>
  );
}
