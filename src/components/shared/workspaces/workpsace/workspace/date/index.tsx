import moment from "moment";

type Props = {
  date: string | null;
};
export default function WorkspaceDate({ date }: Props) {
  if (date === null) return;

  //Created time in ago format
  const createdAtTime = date ? moment(date).fromNow() : null;

  return (
    <span className='text-xs font-normal text-gray-600'>{`Created ${createdAtTime}`}</span>
  );
}
