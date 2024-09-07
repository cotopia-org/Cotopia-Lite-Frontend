import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { getDay } from "@/lib/utils";
import { ScheduleType } from "@/types/calendar";
import React from "react";

type Props = {
  schedule: ScheduleType;
};

export default function Days({ schedule }: Props) {
  const days = Array.from(Array(7).keys());

  return (
    <div className='flex flex-row items-center justify-center w-full gap-x-2'>
      {days.map((day) => {
        const currentDay = schedule.days.find((x) => x.day === day);

        const isSelected = !!currentDay;

        let clss =
          "flex flex-col items-center justify-center w-10 h-10 cursor-default";

        if (isSelected) clss += ` bg-black text-white cursor-pointer`;

        let timeOfDayTooltip = "";

        if (isSelected)
          timeOfDayTooltip = currentDay.times
            .map((x) => `${x.start} - ${x.end}`)
            .join(", ");

        let content = <div className={clss}>{getDay(day)[0]}</div>;

        return isSelected ? (
          <CotopiaTooltip key={day} title={timeOfDayTooltip}>
            {content}
          </CotopiaTooltip>
        ) : (
          content
        );
      })}
    </div>
  );
}
