import CotopiaButton from "@/components/shared-ui/c-button";
import CSelect from "@/components/shared-ui/c-select";
import {
  AvailabiltyType,
  CalendarType,
  RecurrencePattern,
} from "@/types/calendar";
import { ArrowRight } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import ScheduleSelectDates from "./select-dates";

export type SchuldeOptions = {
  availability: AvailabiltyType;
  pattern: RecurrencePattern;
};

export enum CreateStep {
  SelectOptions = 1,
  SelectDates = 2,
}

const initStep = CreateStep.SelectOptions;
const initOptions = {
  availability: AvailabiltyType.Video,
  pattern: RecurrencePattern.Daily,
};

const SchudleContext = createContext<{
  step: CreateStep;
  setStep: (step: CreateStep) => void;
  options: SchuldeOptions;
  calendar: CalendarType;
}>({
  step: initStep,
  setStep: (step) => {},
  options: initOptions,
  //@ts-ignore
  calendar: {},
});

export const useSchudleCreate = () => useContext(SchudleContext);

type Props = {
  calendar: CalendarType;
};

export default function CreateSchedule({ calendar }: Props) {
  const [step, setStep] = useState<CreateStep>(initStep);

  const [schedule, setSchudule] = useState<SchuldeOptions>(initOptions);

  const change = (key: string, value: any) =>
    setSchudule((prev) => ({ ...prev, [key]: value }));

  const handleNextStep = () => {
    setStep(CreateStep.SelectDates);
  };

  let content = (
    <div className='flex flex-col gap-y-10'>
      <div className='flex flex-col gap-y-2'>
        <CSelect
          items={[
            { title: "Video", value: "" + AvailabiltyType.Video },
            { title: "Voice", value: "" + AvailabiltyType.Voice },
            { title: "Text", value: "" + AvailabiltyType.Text },
          ]}
          label='Availability Type'
          defaultValue={"" + schedule.availability}
          onChange={(value) => change("availability", +value)}
        />
        <CSelect
          items={[
            { title: "Custom", value: "" + RecurrencePattern.Custom },
            { title: "Daily", value: "" + RecurrencePattern.Daily },
            { title: "Weekly", value: "" + RecurrencePattern.Weekly },
            { title: "Monthly", value: "" + RecurrencePattern.Monthly },
          ]}
          label='Recurrence Pattern'
          defaultValue={"" + schedule.pattern}
          onChange={(value) => change("pattern", +value)}
        />
      </div>
      <div className='flex flex-row justify-end'>
        <CotopiaButton
          className='min-w-[100px]'
          endIcon={<ArrowRight size={16} />}
          onClick={handleNextStep}
        >
          Next
        </CotopiaButton>
      </div>
    </div>
  );

  if (step === CreateStep.SelectDates)
    content = <ScheduleSelectDates options={schedule} />;

  return (
    <SchudleContext.Provider
      value={{ options: schedule, step: step, setStep, calendar }}
    >
      {content}
    </SchudleContext.Provider>
  );
}
