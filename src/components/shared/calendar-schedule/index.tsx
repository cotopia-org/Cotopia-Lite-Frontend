"use client";

import { CalendarType } from "@/types/calendar";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useApi } from "@/hooks/swr";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import CotopiaButton from "@/components/shared-ui/c-button";
import { Save } from "lucide-react";
import { DateRange } from "react-day-picker";
import useLoading from "@/hooks/use-loading";

type Props = {
  calendar: CalendarType;
};
export default function CalendarSchedule({ calendar }: Props) {
  const { data, isLoading: getCalendarLoading } = useApi<
    FetchDataType<CalendarType>
  >(`/calendars/${calendar.id}`);

  const calendarData = data !== undefined ? data?.data : undefined;

  const [hasChanged, setHasChanged] = useState(false);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const handleChangeDate = (date: DateRange | undefined) => {
    if (date !== undefined) {
      setHasChanged(true);
      setDate(date);
    }
  };

  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleStoreCalendarSchedule = () => {
    // axiosInstance.post()
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <Calendar
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
      </div>
    </div>
  );
}
