import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  zoomPercent: number;
};
export default function PreviewZoom({ zoomPercent }: Props) {
  return (
    <div className='flex flex-col items-center bg-white rounded-xl px-2 py-1'>
      <ChevronUp size={16} />
      <span className='min-w-[48px] text-center'>{`${zoomPercent.toFixed(
        0
      )}%`}</span>
      <ChevronDown size={16} />
    </div>
  );
}
