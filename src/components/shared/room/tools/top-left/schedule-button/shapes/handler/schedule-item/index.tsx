import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import Days from "./days";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { Mic, Pencil, Repeat, Video } from "lucide-react";
import EditButton from "./edit";
import ScheduleOverview from "@/components/shared/shedule-overview";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";

type Props = {
  schedule: ScheduleType;
  onDelete?: () => void;
  justView?: boolean;
};

let icons = {
  [AvailabiltyType.Text]: <Pencil size={12} />,
  [AvailabiltyType.Video]: <Video size={12} />,
  [AvailabiltyType.Voice]: <Mic size={12} />,
};

export default function ScheduleItem({ schedule, onDelete, justView }: Props) {
  const today = moment();
  const todayDay = today.day();

  const [selectedDay, setSelectedDay] = useState<number>();
  const handleSelect = useCallback((item: number) => setSelectedDay(item), []);
  const handleDeSelect = useCallback(
    (item: number) => setSelectedDay(todayDay),
    [todayDay]
  );

  useEffect(() => {
    for (let scheduleDays of schedule.days) {
      if (todayDay === scheduleDays.day) {
        setSelectedDay(todayDay);
        break;
      }
    }
  }, [schedule, todayDay]);

  return (
    <div className='flex flex-col gap-y-4 items-start w-full p-4 border rounded-md shadow-md'>
      <div className='flex flex-row justify-between items-center w-full'>
        <CotopiaTooltip
          title={`Available with ${
            AvailabiltyType[schedule.availability_type]
          }`}
        >
          <strong className='italic text-xs text-black/60 flex flex-row items-center gap-x-1'>
            {`${schedule.timezone}`}
            {icons[schedule.availability_type]}
          </strong>
        </CotopiaTooltip>
        <div className='flex flex-row items-center gap-x-2'>
          {!!!justView && (
            <EditButton schedule={schedule} onDelete={onDelete} />
          )}
          {!!schedule.is_recurrence && (
            <CotopiaTooltip title='Recurrence'>
              <Repeat size={12} className='text-black/60' />
            </CotopiaTooltip>
          )}
        </div>
      </div>
      <Days
        schedule={schedule}
        handleDeSelect={handleDeSelect}
        handleSelect={handleSelect}
        selectedDay={selectedDay}
      />
      <div className='min-h-[24px]'>
        {selectedDay !== undefined && (
          <ScheduleOverview item={schedule} selectedDay={selectedDay} />
        )}
      </div>
    </div>
  );
}
