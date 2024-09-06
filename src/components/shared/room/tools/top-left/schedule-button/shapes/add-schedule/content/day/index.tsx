import { ScheduleDayType } from "..";
import { useState } from "react";
import DayTime from "./time";

type Props = {
  day: ScheduleDayType;
};
export default function Day({ day }: Props) {
  const [times, setTimes] = useState<ScheduleDayType["times"]>([
    { from: "00:00", to: "23:55" },
  ]);

  return (
    <div className='flex flex-col gap-y-4'>
      {times.map((item, key) => (
        <DayTime dayTime={item} key={key} />
      ))}
    </div>
  );
}
