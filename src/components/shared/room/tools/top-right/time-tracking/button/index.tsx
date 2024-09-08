import CotopiaButton from "@/components/shared-ui/c-button";

import { Clock } from "lucide-react";
import Timer from "../timer";

type Props = {
  isLoading: boolean;
  onClick: () => void;
  defaultSeconds: number;
};

export default function TimeTrackingButton({
  isLoading,
  onClick,
  defaultSeconds,
}: Props) {
  return (
    <CotopiaButton
      loading={isLoading}
      className='relative bg-white hover:bg-white text-black rounded-xl !pr-6'
      startIcon={<Clock />}
      onClick={onClick}
    >
      <div className='absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse'></div>
      <Timer initialSeconds={defaultSeconds}>
        {(time) => <span className='min-w-[60px]'>{time}</span>}
      </Timer>
    </CotopiaButton>
  );
}
