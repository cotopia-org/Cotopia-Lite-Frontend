import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import Days from "./days";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { Repeat } from "lucide-react";
import EditButton from "./edit";
import ScheduleOverview from "@/components/shared/shedule-overview";
import { useCallback, useState } from "react";

type Props = {
  schedule: ScheduleType;
  onDelete?: () => void;
  justView?: boolean;
};

export default function ScheduleItem({ schedule, onDelete, justView }: Props) {
  const [selectedDay, setSelectedDay] = useState<number>();
  const handleSelect = useCallback((item: number) => setSelectedDay(item), []);
  const handleDeSelect = useCallback(
    (item: number) => setSelectedDay(undefined),
    []
  );

  return (
    <div className='flex flex-col gap-y-4 items-start w-full p-4 border rounded-md shadow-md'>
      <div className='flex flex-row justify-between items-center w-full'>
        <strong className='italic text-xs text-black/60'>
          {`${schedule.timezone} (Available with ${
            AvailabiltyType[schedule.availability_type]
          })`}
        </strong>
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
      />
      <div className='min-h-[24px]'>
        {selectedDay !== undefined && (
          <ScheduleOverview item={schedule} selectedDay={selectedDay} />
        )}
      </div>
    </div>
  );
}
