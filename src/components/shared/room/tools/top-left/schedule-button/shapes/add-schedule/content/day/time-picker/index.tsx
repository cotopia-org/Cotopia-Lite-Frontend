import CSelect from "@/components/shared-ui/c-select";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  defaultValue?: string;
  onChange?: (time: string) => void;
  className?: string;
};

const generateAllTimes = (): string[] => {
  const times: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return times;
};

export default function TimePicker({
  defaultValue,
  onChange,
  className = "",
}: Props) {
  const [value, setValue] = useState<string>("08:00");

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  const times = useMemo(() => {
    return generateAllTimes();
  }, []);

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value);

      if (onChange) onChange(value);
    },
    [onChange]
  );

  return (
    <CSelect
      className={className}
      items={times.map((x) => ({
        title: x,
        value: x,
      }))}
      defaultValue={defaultValue ? defaultValue : value}
      onChange={handleChangeValue}
    />
  );
}
