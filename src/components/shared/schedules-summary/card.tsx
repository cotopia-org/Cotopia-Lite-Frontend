import { AvailabiltyType, ScheduleType } from "@/types/calendar";
import Participants from "../participants";
import ScheduleOverview from "../shedule-overview";
import moment from "moment";
import { useMemo } from "react";

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
    <div className='border rounded-lg p-4 flex flex-col gap-y-2'>
      <Participants className='!pb-0' participants={[schedule.user]} />
      <span className='text-sm italic font-normal'>{`Available today in ${timeToday.times
        .map((x) => `${x.start} - ${x.end}`)
        .join(", ")} (${AvailabiltyType[schedule.availability_type]})`}</span>
    </div>
  );
}
