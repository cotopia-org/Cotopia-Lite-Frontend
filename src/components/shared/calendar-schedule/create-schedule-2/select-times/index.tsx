import TitleEl from "@/components/shared/title-el";
import DaysTime from "./days-time";
import CotopiaButton from "@/components/shared-ui/c-button";
import { CreateStep, useSchudleCreate } from "..";
import { Calendar } from "@/components/ui/calendar";
import colors from "tailwindcss/colors";
import { RecurrenceDays } from "@/types/calendar";
import RepeatableEvents from "./repeatable-events";
import PeriodTimes from "../period";

function afterDayWeek(day: number) {
  let finalDay = day + 1;
  if (finalDay > 6) finalDay = 0;
  return finalDay;
}

export default function SelectTimes() {
  const { setStep, options } = useSchudleCreate();

  const modifiers = options.days.reduce(
    (a, v) => ({
      ...a,
      [RecurrenceDays[v].toLowerCase()]: { dayOfWeek: [afterDayWeek(v)] },
    }),
    {}
  );

  const modifierStyles = options.days.reduce(
    (a, v) => ({
      ...a,
      [RecurrenceDays[v].toLowerCase()]: {
        color: colors.slate[200],
        backgroundColor: colors.black, // Example style for Sundays
      },
    }),
    {}
  );

  return (
    <div className='flex flex-col gap-y-8'>
      <TitleEl title='Calendar'>
        <Calendar modifiers={modifiers} modifiersStyles={modifierStyles} />
      </TitleEl>
      <DaysTime />
      <RepeatableEvents />
      <div className='flex flex-row justify-end items-center gap-x-2'>
        <CotopiaButton
          variant={"outline"}
          className='min-w-[80px]'
          onClick={() => setStep(CreateStep.SelectOptions)}
        >
          Back
        </CotopiaButton>
        <CotopiaButton variant={"default"} className='min-w-[120px]'>
          Submit
        </CotopiaButton>
      </div>
    </div>
  );
}
