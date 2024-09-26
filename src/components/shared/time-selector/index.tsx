// TimeSelector.tsx
import React, { useState, useEffect } from "react";
import TitleEl from "../title-el";
import { initSheduleTimes } from "../room/tools/top-left/schedule-button/shapes/add-schedule/content/day";

interface TimeSelectorProps {
  onTimeChange: (time: string) => void;
  defaultValue?: string;
  label: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  onTimeChange,
  defaultValue = initSheduleTimes.from,
  label,
}) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  useEffect(() => {
    const [defaultHours, defaultMinutes] = defaultValue.split(":");
    setHours(defaultHours);
    setMinutes(defaultMinutes);
  }, [defaultValue]);

  const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newHours = event.target.value;
    setHours(newHours);
    onTimeChange(`${newHours}:${minutes}`);
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = event.target.value;
    setMinutes(newMinutes);
    onTimeChange(`${hours}:${newMinutes}`);
  };

  const renderOptions = (count: number) => {
    return Array.from(Array(count).keys()).map((num) => {
      const value = num.toString().padStart(2, "0");
      return (
        <option key={value} value={value}>
          {value}
        </option>
      );
    });
  };

  return (
    <TitleEl title={label}>
      <div className='flex flex-row border p-2 justify-start'>
        <select value={hours} onChange={handleHoursChange}>
          {renderOptions(24)}
        </select>
        :
        <select value={minutes} onChange={handleMinutesChange}>
          {renderOptions(60)}
        </select>
      </div>
    </TitleEl>
  );
};

export default TimeSelector;
