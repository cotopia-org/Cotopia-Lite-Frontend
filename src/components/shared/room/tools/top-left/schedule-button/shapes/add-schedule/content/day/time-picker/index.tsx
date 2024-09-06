import CSelect from "@/components/shared-ui/c-select";
import { useEffect, useMemo, useState } from "react";

type Props = {
  defaultValue?: string;
  onChange: (time: string) => void;
};

const generateAllTimes = (): string[] => {
  const times: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return times;
};

export default function TimePicker({ defaultValue, onChange }: Props) {
  const [value, setValue] = useState<string>("00:00");

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  const times = useMemo(() => {
    return generateAllTimes();
  }, []);

  const handleChangeValue = (value: string) => {
    setValue(value);

    if (onChange) onChange(value);
  };

  return (
    <CSelect
      items={times.map((x) => ({
        title: x,
        value: x,
      }))}
      defaultValue={value}
      onChange={handleChangeValue}
    />
  );
}
