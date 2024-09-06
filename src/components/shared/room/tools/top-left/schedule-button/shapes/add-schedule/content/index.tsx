"use client";

import { useCallback, useEffect, useState } from "react";
import Day from "./day";
import CotopiaButton from "@/components/shared-ui/c-button";
import { Save } from "lucide-react";
import useLoading from "@/hooks/use-loading";

export type ScheduleDayType = {
  index: number;
  times: { from: string; to: string }[];
};

type Props = {
  onClose: () => void;
};

export default function AddScheduleContent({ onClose }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleSubmitEvent = () => {
    // startLoading();
  };

  const [daysValue, setDaysValue] = useState<ScheduleDayType[]>();

  useEffect(() => {
    if (daysValue !== undefined) return;

    setDaysValue([]);

    const days = Array.from(Array(7).keys());
    for (let dayIndex in days) {
      setDaysValue((prev) => [
        ...(prev as ScheduleDayType[]),
        { index: +dayIndex, times: [{ from: "00:00", to: "23:30" }] },
      ]);
    }
  }, [daysValue]);

  const handleChangeDay = useCallback((index: number, day: ScheduleDayType) => {
    setDaysValue((prev) => {
      (prev as ScheduleDayType[])[index] = day;

      console.log("prev", prev);

      return prev;
    });
  }, []);

  if (daysValue === undefined) return;

  return (
    <div className='flex flex-col gap-y-10'>
      <div className='flex flex-col gap-y-6 mt-8'>
        {daysValue.map((day, index) => (
          <div className='day' key={index}>
            <Day
              day={day}
              onChange={(dayValue) => handleChangeDay(index, dayValue)}
            />
            <hr className='mt-6' />
          </div>
        ))}
      </div>
      <div className='flex flex-row justify-end gap-x-2'>
        <CotopiaButton
          variant={"outline"}
          className='min-w-[120px]'
          onClick={onClose}
        >
          Close
        </CotopiaButton>
        <CotopiaButton startIcon={<Save size={16} />} className='min-w-[160px]'>
          Create Event
        </CotopiaButton>
      </div>
    </div>
  );
}
