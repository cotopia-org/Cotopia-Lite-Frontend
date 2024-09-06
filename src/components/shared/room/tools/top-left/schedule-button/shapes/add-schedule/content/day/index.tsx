import { ScheduleDayType } from "..";
import { useCallback, useEffect, useState } from "react";
import DayTime from "./time";
import CotopiaSwitch from "@/components/shared-ui/c-switch";
import { getDay } from "@/lib/utils";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Plus, Trash } from "lucide-react";

type Props = {
  day: ScheduleDayType;
  onChange: (day: ScheduleDayType) => void;
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

const initTime = { from: "00:00", to: "23:30" };

export default function Day({ day, onChange }: Props) {
  const [value, setValue] = useState<ScheduleDayType>({ index: 0, times: [] });
  useEffect(() => {
    if (day !== undefined) setValue(day);
  }, [day]);

  const handleAddDay = useCallback(() => {
    setValue((prev) => {
      const nValue = {
        ...prev,
        times: [...(prev?.times ?? []), initTime],
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

  return (
    <div className='flex flex-row items-start gap-x-2'>
      <div className='min-w-[200px] mt-2'>
        <CotopiaSwitch label={getDay(day.index)} />
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
