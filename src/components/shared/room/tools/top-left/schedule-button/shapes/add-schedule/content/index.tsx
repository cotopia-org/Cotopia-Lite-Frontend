"use client";

import { useCallback, useEffect, useState } from "react";
import Day from "./day";
import CotopiaButton from "@/components/shared-ui/c-button";
import { Save, Trash } from "lucide-react";
import useLoading from "@/hooks/use-loading";
import TitleEl from "@/components/shared/title-el";
import AvailabilityType from "./availability";
import { AvailabiltyType } from "@/types/calendar";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import DeleteEvent from "../delete-event";

export type ScheduleDayType = {
  index: number;
  times: { from: string; to: string }[];
  availability_type: AvailabiltyType;
  selected: boolean;
};

type Props = {
  onClose: () => void;
  defaultId?: number;
  defaultValue?: {
    availability_type: AvailabiltyType;
    days: { [key: number]: ScheduleDayType };
  };
  onDelete?: () => void;
  onCreated?: () => void;
};

export default function AddScheduleContent({
  onClose,
  defaultId,
  defaultValue,
  onDelete,
  onCreated,
}: Props) {
  const isEdit = defaultValue !== undefined && defaultId !== undefined;

  const [availability, setAvailability] = useState<AvailabiltyType>(
    AvailabiltyType.Voice
  );

  const [daysValue, setDaysValue] = useState<{
    [key: number]: ScheduleDayType;
  }>();

  useEffect(() => {
    if (defaultValue !== undefined) {
      const { availability_type, days } = defaultValue;

      setAvailability(availability_type);
      setDaysValue(days);
    }
  }, [defaultValue]);

  const days = Array.from(Array(7).keys());

  useEffect(() => {
    if (daysValue !== undefined) return;
  }, [daysValue]);

  const handleChangeDay = (index: number, day: ScheduleDayType) => {
    setDaysValue((prev) => {
      const prevDays: any = prev !== undefined ? prev : {};

      prevDays[index] = day;

      return prevDays;
    });
  };

  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleSubmitEvent = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (daysValue === undefined) return;

    startLoading();
    let payload: { [key: string]: any } = {
      is_recurrence: true,
      timezone: userTimeZone,
      availability_type: availability,
    };

    const daysArray = Object.keys(daysValue)
      .map((x) => ({ day: daysValue[+x], dayIndex: x }))
      .filter((x) => x.day.selected)
      .map((x) => ({
        day: +x.dayIndex,
        times: x.day.times.map((a) => ({
          start: a.from,
          end: a.to,
        })),
      }));

    payload["days"] = daysArray;

    axiosInstance({
      url: isEdit ? `/schedules/${defaultId}` : `/schedules`,
      method: isEdit ? "PUT" : "POST",
      data: payload,
    })
      .then((res) => {
        toast.success(
          isEdit ? "Event has been updated" : "Event has been created"
        );
        if (!isEdit) {
          if (onCreated) onCreated();
        }
        stopLoading();
      })
      .catch(() => {
        stopLoading();
      });
  };

  return (
    <div className='flex flex-col gap-y-8'>
      <TitleEl title='Availability Type'>
        <AvailabilityType value={availability} onChange={setAvailability} />
      </TitleEl>
      <TitleEl title='Times'>
        <div className='flex flex-col gap-y-6'>
          {days.map((dayNumber, index) => {
            const day = daysValue?.[dayNumber];

            return (
              <div className='day' key={index}>
                <Day
                  index={index}
                  day={day}
                  onChange={(dayValue) => handleChangeDay(index, dayValue)}
                />
                <hr className='mt-6' />
              </div>
            );
          })}
        </div>
      </TitleEl>
      <div className='flex flex-row justify-end gap-x-2'>
        <CotopiaButton
          variant={"outline"}
          className='min-w-[120px]'
          onClick={onClose}
        >
          Close
        </CotopiaButton>
        {isEdit && (
          <DeleteEvent
            eventId={defaultId}
            onDelete={() => onDelete && onDelete()}
          />
        )}
        <CotopiaButton
          onClick={handleSubmitEvent}
          startIcon={<Save size={16} />}
          className='min-w-[160px]'
          loading={isLoading}
        >
          {`${isEdit ? "Update" : "Create"} Event`}
        </CotopiaButton>
      </div>
    </div>
  );
}
