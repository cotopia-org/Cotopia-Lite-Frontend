import { CalendarType } from "@/types/calendar";
import CreateCalendar from "./create-calendar";
import CalendarSchedule from "@/components/shared/calendar-schedule";

type Props = {
  calendars: CalendarType[];
  onCreate: (item: CalendarType) => void;
};
export default function Calendars({ calendars, onCreate }: Props) {
  if (calendars.length === 0) return <CreateCalendar onCreate={onCreate} />;

  const targetCalendar = calendars[0];

  return <CalendarSchedule calendar={targetCalendar} />;
}
