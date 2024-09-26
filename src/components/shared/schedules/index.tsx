import { ScheduleType } from "@/types/calendar";
import ScheduleItem from "../room/tools/top-left/schedule-button/shapes/handler/schedule-item";
import NotFound from "../layouts/not-found";

type Props = {
  items: ScheduleType[];
  onDelete?: () => void;
  justView?: boolean;
};
export default function Schedules({ items, onDelete, justView = true }: Props) {
  if (items.length === 0)
    return (
      <NotFound
        title='There is no schedule for this user yet!'
        className='py-6'
      />
    );

  return (
    <div className='mb-6 flex flex-col gap-y-2'>
      {items.map((x) => (
        <ScheduleItem
          schedule={x}
          key={x.id}
          onDelete={onDelete}
          justView={justView}
        />
      ))}
    </div>
  );
}
