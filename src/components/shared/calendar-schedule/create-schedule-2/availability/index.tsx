import CBadgeItems, {
  CBadgeValueType,
} from "@/components/shared-ui/c-badge-items";
import TitleEl from "@/components/shared/title-el";
import { AvailabiltyType } from "@/types/calendar";

type Props = {
  defaultValue?: CBadgeValueType;
  onChange: (value: CBadgeValueType[]) => void;
};

export default function Availability({ defaultValue, onChange }: Props) {
  return (
    <TitleEl title='Availability Type'>
      <CBadgeItems
        items={[
          { title: "Video", value: AvailabiltyType.Video },
          { title: "Voice", value: AvailabiltyType.Voice },
          { title: "Text", value: AvailabiltyType.Text },
        ]}
        onChange={onChange}
        defaultSelected={
          defaultValue !== undefined ? [defaultValue] : undefined
        }
        isSingular
      />
    </TitleEl>
  );
}
