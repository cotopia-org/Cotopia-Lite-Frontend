import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  AvailabiltyType,
  CalendarType,
  RecurrenceDays,
} from "@/types/calendar";
import SelectOptions from "./select-options";
import SelectTimes from "./select-times";

export type SchuldeOptions = {
  availability: AvailabiltyType;
  days: RecurrenceDays[];
  daysTimes: { [key: number]: { from: string; to: string } };
};

export enum CreateStep {
  SelectOptions = 1,
  SelectTimes = 2,
}

const initStep = CreateStep.SelectOptions;
const initOptions = {
  availability: AvailabiltyType.Video,
  days: [],
  daysTimes: {},
};

const SchudleContext = createContext<{
  step: CreateStep;
  setStep: (step: CreateStep) => void;
  options: SchuldeOptions;
  calendar: CalendarType;
  setSchudule: (options: SetStateAction<SchuldeOptions>) => void;
}>({
  step: initStep,
  setStep: (step) => {},
  options: initOptions,
  //@ts-ignore
  calendar: {},
  setSchudule: (options) => {},
});

export const useSchudleCreate = () => useContext(SchudleContext);

type Props = {
  calendar: CalendarType;
};

export default function CreateSchedule2({ calendar }: Props) {
  const [step, setStep] = useState<CreateStep>(initStep);

  const [schedule, setSchudule] = useState<SchuldeOptions>(initOptions);

  const change = (key: string, value: any) =>
    setSchudule((prev) => ({ ...prev, [key]: value }));

  let content = (
    <SelectOptions
      onChangeAvailability={(avail) => change("availability", avail)}
      onChangeDays={(days) => change("days", days)}
    />
  );

  if (step === CreateStep.SelectTimes) content = <SelectTimes />;

  return (
    <SchudleContext.Provider
      value={{ options: schedule, step: step, setStep, calendar, setSchudule }}
    >
      {content}
    </SchudleContext.Provider>
  );
}
