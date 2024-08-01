import TimeSelector from "@/components/shared/time-selector";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RecurrenceDays } from "@/types/calendar";
import { useEffect, useState } from "react";

type Props = {
  day: RecurrenceDays;
  defaultValue?: { from?: string; to?: string };
  onChange: (value: { from?: string; to?: string }) => void;
};
export default function DayTime({ day, defaultValue, onChange }: Props) {
  const [time, setTime] = useState<{ from?: string; to?: string }>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    if (defaultValue !== undefined) setTime(defaultValue);
  }, [defaultValue]);

  const handleChangeTime = (time: string, key: string) => {
    setTime((prev) => {
      const nValue = { ...prev, [key]: time };
      if (onChange) onChange(nValue);
      return nValue;
    });
  };

  return (
    <AccordionItem value={"" + day}>
      <AccordionTrigger>{RecurrenceDays[day]}</AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  );
}
