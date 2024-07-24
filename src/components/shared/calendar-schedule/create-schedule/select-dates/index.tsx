import { RecurrencePattern } from "@/types/calendar";
import { SchuldeOptions } from "..";
import SelectDaily from "./daily";
import SelectMonthly from "./monthly";
import SelectWeekly from "./weekly";
import SelectCustom from "./custom";

type Props = {
  options: SchuldeOptions;
};
export default function ScheduleSelectDates({ options }: Props) {
  switch (options.pattern) {
    case RecurrencePattern.Custom:
      return <SelectCustom options={options} />;
    case RecurrencePattern.Daily:
      return <SelectDaily options={options} />;
    case RecurrencePattern.Monthly:
      return <SelectMonthly options={options} />;
    case RecurrencePattern.Weekly:
      return <SelectWeekly options={options} />;
  }
}
