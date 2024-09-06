import { useApi } from "@/hooks/swr";
import AddScheduleButton from "../add-schedule";
import { ScheduleType } from "@/types/calendar";
import { FetchDataType } from "@/lib/axios";
import FullLoading from "@/components/shared/full-loading";
import ScheduleItem from "./schedule-item";

export default function ShapesHandler() {
  const { data, isLoading, mutate } =
    useApi<FetchDataType<ScheduleType[]>>(`/users/schedules`);

  const schedules = data !== undefined ? data?.data : [];

  let content = null;

  if (schedules.length > 0)
    content = (
      <div className='mb-6 flex flex-col gap-y-2'>
        {schedules.map((x) => (
          <ScheduleItem schedule={x} key={x.id} onDelete={mutate} />
        ))}
      </div>
    );

  if (isLoading || data === undefined) return <FullLoading />;

  return (
    <div className='flex flex-col gap-y-2 items-end'>
      {content}
      <AddScheduleButton onDelete={mutate} onCreated={mutate} />
    </div>
  );
}
