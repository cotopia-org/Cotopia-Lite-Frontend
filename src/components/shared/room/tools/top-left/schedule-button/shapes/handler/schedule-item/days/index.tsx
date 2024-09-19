import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { getDay } from "@/lib/utils";
import { ScheduleType } from "@/types/calendar";
import { Dot } from "lucide-react";
import moment from "moment";
import React from "react";

type Props = {
  schedule: ScheduleType;
  handleSelect: (day: number) => void;
  handleDeSelect: (day: number) => void;
  selectedDay?: number;
};

export default function Days({
  schedule,
  handleSelect,
  handleDeSelect,
  selectedDay,
}: Props) {
  const today = moment();

  const days = Array.from(Array(7).keys());

  return (
    <div className='flex flex-row items-center justify-center w-full gap-x-2'>
      {days.map((day) => {
        const currentDay = schedule.days.find((x) => x.day === day);

        const isSelected = !!currentDay;

        const isToday = today.day() === day;

        let clss =
          "relative flex flex-col items-center justify-center w-10 h-10 cursor-default rounded-md";

        if (isSelected)
          clss += ` border border-blue-500 text-blue-500 cursor-pointer bg-white hover:bg-blue-50`;
        else clss += ` grayscale opacity-[.4]`;

        let timeOfDayTooltip = "";

        if (isSelected)
          timeOfDayTooltip = currentDay.times
            .map((x) => `${x.start} - ${x.end}`)
            .join(", ");

        if (isSelected && isToday && selectedDay === day) {
          clss += ` bg-blue-50`;
        }

        let content = (
          <div
            className={clss}
            onMouseEnter={() => handleSelect(day)}
            onMouseLeave={() => handleDeSelect(day)}
          >
            <span>{getDay(day)[0]}</span>
            {!!isToday && (
              <span className='absolute text-blue-500 bottom-[-12px] left-[50%] translate-x-[-50%]'>
                <Dot />
              </span>
            )}
          </div>
        );

        return (
          <>
            {isSelected ? (
              <CotopiaTooltip key={day} title={timeOfDayTooltip}>
                {content}
              </CotopiaTooltip>
            ) : (
              content
            )}
          </>
        );
      })}
    </div>
  );
}
