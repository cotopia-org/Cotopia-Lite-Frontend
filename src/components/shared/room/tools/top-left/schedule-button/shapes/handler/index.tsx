import { useApi } from "@/hooks/swr";
import AddScheduleButton from "../add-schedule";
import { ScheduleType } from "@/types/calendar";
import { FetchDataType } from "@/lib/axios";
import FullLoading from "@/components/shared/full-loading";
import Schedules from "@/components/shared/schedules";
import { useEffect } from "react";

type Props = {
  onGetMySchedules?: (schedules: ScheduleType[]) => void;
};

export default function ShapesHandler({ onGetMySchedules }: Props) {
  const { data, isLoading, mutate } =
    useApi<FetchDataType<ScheduleType[]>>(`/users/me/schedules`);

  const schedules = data !== undefined ? data?.data : [];

  useEffect(() => {
    if (onGetMySchedules) onGetMySchedules(schedules);
  }, [onGetMySchedules, schedules]);

  let content = null;

  if (schedules.length > 0)
    content = (
      <Schedules justView={false} items={schedules} onDelete={mutate} />
    );

  if (isLoading || data === undefined) return <FullLoading />;

  return (
    <div className='flex flex-col gap-y-2 items-end'>
      {content}
      <AddScheduleButton onDelete={mutate} onCreated={mutate} />
    </div>
  );
}
