import CBadgeItems, {
  CBadgeValueType,
} from "@/components/shared-ui/c-badge-items";
import TitleEl from "@/components/shared/title-el";
import { RecurrenceDays } from "@/types/calendar";

type Props = {
  defaultValue: CBadgeValueType[];
  onChange: (days: CBadgeValueType[]) => void;
};
export default function Days({ onChange, defaultValue }: Props) {
  return (
    <TitleEl title='Which days you are available?'>
      <CBadgeItems
        defaultSelected={defaultValue}
        items={[
          { title: "Sunday", value: RecurrenceDays.Sunday },
          { title: "Monday", value: RecurrenceDays.Monday },
          { title: "Tuesday", value: RecurrenceDays.Tuesday },
          { title: "Wednesday", value: RecurrenceDays.Wednesday },
          { title: "Thursday", value: RecurrenceDays.Thursday },
          { title: "Friday", value: RecurrenceDays.Friday },
          { title: "Saturday", value: RecurrenceDays.Saturday },
        ]}
        onChange={onChange}
      />
    </TitleEl>
  );
}
