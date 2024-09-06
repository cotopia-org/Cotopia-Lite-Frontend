import { getDay } from "date-fns";
import { ScheduleDayType } from "..";
import TimePicker from "./time-picker";
import { useCallback, useEffect, useState } from "react";

type Props = {
  dayTime: ScheduleDayType["times"][0];
};
export default function DayTime({ dayTime }: Props) {
  //   const [time, setTime] = useState<ScheduleDayType["times"][0]>({
  //     from: "",
  //     to: "",
  //   });
  //   useEffect(() => {
  //     if (dayTime !== undefined) setTime(dayTime);
  //   }, [dayTime]);

  const handleChange = useCallback((type: "from" | "to", value: string) => {},
  []);

  return (
    <div className='flex flex-row gap-x-4'>
      <TimePicker
        // defaultValue={time?.from}
        onChange={(time: string) => handleChange("from", time)}
      />
      <TimePicker
        // defaultValue={time?.to}
        onChange={(time: string) => handleChange("to", time)}
      />
    </div>
  );
}
