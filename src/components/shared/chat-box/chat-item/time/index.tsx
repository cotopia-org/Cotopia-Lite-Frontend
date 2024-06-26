import moment from "moment";

type Props = {
  time: number;
};
export default function Time({ time }: Props) {
  return (
    <span className='text-gray-400 text-xs'>
      {moment.unix(time).format("HH:mm a")}
    </span>
  );
}
