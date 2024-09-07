import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import Days from "./days";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { Edit, Repeat } from "lucide-react";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import EditButton from "./edit";

type Props = {
  schedule: ScheduleType;
  onDelete: () => void;
};

export default function ScheduleItem({ schedule, onDelete }: Props) {
  return (
    <div className='flex flex-col gap-y-4 items-start w-full p-4 border rounded-md shadow-md'>
      <div className='flex flex-row justify-between items-center w-full'>
        <strong className='italic text-xs text-black/60'>
          {`${schedule.timezone} (Available with ${
            AvailabiltyType[schedule.availability_type]
          })`}
        </strong>
        <div className='flex flex-row items-center gap-x-2'>
          <EditButton schedule={schedule} onDelete={onDelete} />
          {schedule.is_recurrence && (
            <CotopiaTooltip title='Recurrence'>
              <Repeat size={12} className='text-black/60' />
            </CotopiaTooltip>
          )}
        </div>
      </div>
      <Days schedule={schedule} />
    </div>
  );
}
