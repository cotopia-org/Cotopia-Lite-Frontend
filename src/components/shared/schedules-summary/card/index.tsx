import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import Participants from "../../participants";
import { Mic, Pencil, Video } from "lucide-react";
import TimeShower from "./time-shower";

type Props = {
  schedule: ScheduleType;
  onHide: () => void;
};
export default function Card({ schedule, onHide }: Props) {
  const [isHide, setIsHide] = useState(false);

  const handleHide = useCallback(() => {
    setIsHide(true);
    if (onHide) onHide();
  }, [onHide]);

  const today = moment();

  const timeToday = useMemo(() => {
    const dayTarget = schedule.days.find((x) => x.day === today.day());

    if (dayTarget) {
      return dayTarget;
    }

    return undefined;
  }, [schedule, today.day()]);

  if (timeToday === undefined) return;

  let icons = {
    [AvailabiltyType.Text]: <Pencil size={12} />,
    [AvailabiltyType.Video]: <Video size={12} />,
    [AvailabiltyType.Voice]: <Mic size={12} />,
  };

  if (isHide) return;

  return (
    <div className='flex flex-row items-center gap-x-2 gap-y-2 select-none'>
      <Participants className='!pb-0' participants={[schedule.user]} />
      <div className='flex flex-row items-center gap-x-1'>
        <span className='text-xs'>{icons[schedule.availability_type]}</span>
        <TimeShower times={timeToday.times} onHide={handleHide} />
      </div>
    </div>
  );
}
