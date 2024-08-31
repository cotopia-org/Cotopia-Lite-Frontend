type Props = {
  height?: number;
};
export default function VerticalDivider({ height = 24 }: Props) {
  return <div className='w-[1px] bg-black/10' style={{ height }}></div>;
}
