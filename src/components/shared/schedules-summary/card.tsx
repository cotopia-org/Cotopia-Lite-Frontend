import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import Participants from "../participants";
import ScheduleOverview from "../shedule-overview";
import moment from "moment";
import { useMemo } from "react";
import UserOverview from "../user-overview";

type Props = {
  schedule: ScheduleType;
};
export default function Card({ schedule }: Props) {
  const today = moment();

  const timeToday = useMemo(() => {
    const dayTarget = schedule.days.find((x) => x.day === today.day());

    if (dayTarget) {
      return dayTarget;
    }

    return undefined;
  }, [schedule, today.day()]);

  if (timeToday === undefined) return;

  return (
    <div className='border rounded-lg p-4 flex flex-col gap-y-2 select-none'>
      <UserOverview user={schedule.user} />
      <span className='text-xs text-black/60 italic font-normal'>{`Available today in ${timeToday.times
        .map((x) => `${x.start} - ${x.end}`)
        .join(", ")} (${AvailabiltyType[schedule.availability_type]})`}</span>
    </div>
  );
}
