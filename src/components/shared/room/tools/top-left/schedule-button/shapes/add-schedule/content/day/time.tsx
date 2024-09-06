import { getDay } from "date-fns";
import { ScheduleDayType } from "..";
import TimePicker from "./time-picker";
import { useCallback, useEffect, useState } from "react";
import { Minus } from "lucide-react";

type Props = {
  dayTime: ScheduleDayType["times"][0];
  onChange: (dayTime: ScheduleDayType["times"][0]) => void;
};
export default function DayTime({ dayTime, onChange }: Props) {
  const [time, setTime] = useState<ScheduleDayType["times"][0]>({
    from: "",
    to: "",
  });
  useEffect(() => {
    if (dayTime !== undefined) setTime(dayTime);
  }, [dayTime]);

  const handleChange = useCallback(
    (type: "from" | "to", value: string) => {
      setTime((prev) => {
        const nValue = { ...prev, [type]: value };

        if (onChange) onChange(nValue);

        return nValue;
      });
    },
    [onChange]
  );

  return (
    <div className='flex flex-row gap-x-4 items-center'>
      <TimePicker
        defaultValue={time?.from}
        onChange={(time: string) => handleChange("from", time)}
      />
      <div>
        <Minus size={12} />
      </div>
      <TimePicker
        defaultValue={time?.to}
        onChange={(time: string) => handleChange("to", time)}
      />
    </div>
  );
}
