type Props = {
  rank: number;
};
export default function Rank({ rank }: Props) {
  let clss =
    "rounded-full w-6 h-6 flex flex-col items-center justify-center text-xs";

  if (rank === 1) {
    clss += ` bg-yellow-600 text-white`;
  } else if (rank === 2) {
    clss += ` bg-gray-400 text-white`;
  } else if (rank === 3) {
    clss += ` bg-orange-800 text-white`;
  } else {
    clss += ` bg-blue-100`;
  }

  return <div className={clss}>{rank}</div>;
}
