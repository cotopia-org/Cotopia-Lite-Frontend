import { ScheduleDayType } from "..";
import { useCallback, useEffect, useState } from "react";
import DayTime from "./time";
import CotopiaSwitch from "@/components/shared-ui/c-switch";
import { getDay } from "@/lib/utils";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Plus, Trash } from "lucide-react";
import { AvailabiltyType } from "@/types/calendar";

type Props = {
  day?: ScheduleDayType;
  onChange: (day: ScheduleDayType) => void;
  index: number;
};

function DayPlus({ onClick }: { onClick: () => void }) {
  return (
    <CotopiaIconButton className='text-black' onClick={onClick}>
      <Plus size={12} />
    </CotopiaIconButton>
  );
}

function DayRemove({ onClick }: { onClick: () => void }) {
  return (
    <CotopiaIconButton className='text-black' onClick={onClick}>
      <Trash size={12} />
    </CotopiaIconButton>
  );
}

export const initSheduleTimes = { from: "09:00", to: "16:00" };

export default function Day({ day, onChange, index }: Props) {
  const [value, setValue] = useState<ScheduleDayType>({
    index: 0,
    times: [initSheduleTimes],
    availability_type: AvailabiltyType.Voice,
    selected: false,
  });
  useEffect(() => {
    if (day !== undefined) setValue(day);
  }, [day]);

  const handleAddDay = useCallback(() => {
    setValue((prev) => {
      const nValue = {
        ...prev,
        times: [...(prev?.times ?? []), initSheduleTimes],
      };

      if (onChange) onChange(nValue);

      return nValue;
    });
  }, [onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      setValue((prev) => {
        const nValue = {
          ...prev,
          times: prev.times.filter((x, itemIndex) => index !== itemIndex),
        };

        if (onChange) onChange(nValue);

        return nValue;
      });
    },
    [onChange]
  );

  const handleChangeTime = (
    index: number,
    value: ScheduleDayType["times"][0]
  ) => {
    setValue((prev) => {
      prev.times[index] = value;

      if (onChange) onChange(prev);

      return prev;
    });
  };

  const handleToggleSelectDay = (value: boolean) => {
    setValue((prev) => {
      const nValue = { ...prev, selected: value };

      if (onChange) onChange(nValue);

      return nValue;
    });
  };

  return (
    <div className='flex flex-row items-start gap-x-2'>
      <div className='min-w-[200px] mt-2'>
        <CotopiaSwitch
          label={getDay(index)}
          checked={value.selected}
          onCheckedChange={handleToggleSelectDay}
        />
      </div>
      <div className='flex flex-col gap-y-4 w-full'>
        {value?.times.map((item, key) => (
          <div key={key} className='flex flex-row items-center gap-x-2'>
            <DayTime
              dayTime={item}
              onChange={(dayTime) => handleChangeTime(key, dayTime)}
            />
            {key === 0 ? (
              <DayPlus onClick={handleAddDay} />
            ) : (
              <DayRemove onClick={() => handleRemove(key)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
