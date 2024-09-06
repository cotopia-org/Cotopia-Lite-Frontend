import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { FullModalBox } from "@/components/shared/modal-box";
import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import { Edit } from "lucide-react";
import AddScheduleContent, {
  ScheduleDayType,
} from "../../../add-schedule/content";
import { useMemo } from "react";

type Props = {
  schedule: ScheduleType;
  onDelete: () => void;
};
export default function EditButton({ schedule, onDelete }: Props) {
  const defaultValue = useMemo(() => {
    const scheduleDays = schedule.days.map((x) => x.day);
    const days = Array.from(Array(7).keys());

    console.log("scheduleDays", scheduleDays);
    console.log("days", days);

    const finalDays: { [key: number]: ScheduleDayType } = {};

    for (let item of schedule.days) {
      finalDays[item.day] = {
        availability_type: schedule.availability_type,
        index: item.day,
        selected: true,
        times: item?.times?.map((x) => ({ from: x.start, to: x.end })) ?? [],
      };
    }

    return {
      availability_type: schedule.availability_type,
      days: finalDays,
    };
  }, [schedule]);

  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaTooltip title='Edit schedule'>
          <CotopiaIconButton
            onClick={open}
            className='text-black/60 hover:text-black w-8 h-8'
          >
            <Edit size={12} />
          </CotopiaIconButton>
        </CotopiaTooltip>
      )}
      className='w-[640px]'
    >
      {(open, close) => (
        <AddScheduleContent
          onClose={close}
          defaultId={schedule.id}
          defaultValue={defaultValue}
          onDelete={() => {
            onDelete();
            close();
          }}
        />
      )}
    </FullModalBox>
  );
}
