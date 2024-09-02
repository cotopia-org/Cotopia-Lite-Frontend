"use client";

import { CalendarType } from "@/types/calendar";
import CreateSchedule2 from "./create-schedule-2";

type Props = {
  calendar: CalendarType;
};
export default function CalendarSchedule({ calendar }: Props) {
  // const [hasChanged, setHasChanged] = useState(false);

  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: undefined,
  // });

  // const handleChangeDate = (date: DateRange | undefined) => {
  //   if (date !== undefined) {
  //     setHasChanged(true);
  //     setDate(date);
  //   }
  // };

  return (
    <div className='flex flex-col gap-y-4 w-[280px] max-h-[800px] max-w-full overflow-y-auto'>
      {/* {!!calendarData && <CreateSchedule calendar={calendarData} />} */}
      <CreateSchedule2 calendar={calendar} />
      {/* <Calendar
        mode='range'
        selected={date}
        onSelect={handleChangeDate}
        className='rounded-md border'
      />
      <div className='flex flex-row items-center gap-x-2 justify-end'>
        <CotopiaButton
          disabled={!hasChanged}
          className='w-[100px]'
          startIcon={<Save size={16} />}
        >
          Save
        </CotopiaButton>
      </div> */}
    </div>
  );
}
