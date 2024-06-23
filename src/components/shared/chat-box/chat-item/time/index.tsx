import moment from "moment";

type Props = {
  time: number;
};
export default function Time({ time }: Props) {
  return (
    <span className='text-gray-400'>{moment.unix(time).format("HH:MM a")}</span>
  );
}
