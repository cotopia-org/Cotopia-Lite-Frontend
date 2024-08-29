import UserAvatar from "../user-avatar";

type Props = {
  items: { title: string; src: string }[];
};
export default function Avatars({ items }: Props) {
  return (
    <div className='flex flex-row gap-1 items-center flex-wrap'>
      {items.map((item, key) => (
        <UserAvatar {...item} key={key} />
      ))}
    </div>
  );
}
