import { ScheduleType } from "@/types/calendar";
import Card from "./card";

type Props = {
  schedules: ScheduleType[];
};
export default function SchedulesSummary({ schedules }: Props) {
  if (schedules.length === 0) return;

  return (
    <div className='flex flex-col gap-y-2'>
      {schedules.map((sch) => (
        <Card key={sch.id} schedule={sch} />
      ))}
    </div>
  );
}
