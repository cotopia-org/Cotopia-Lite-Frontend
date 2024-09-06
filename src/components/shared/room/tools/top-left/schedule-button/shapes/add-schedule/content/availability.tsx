import CBadgeItems from "@/components/shared-ui/c-badge-items";
import { AvailabiltyType } from "@/types/calendar";

type Props = {
  value?: AvailabiltyType;
  onChange: (change: AvailabiltyType) => void;
};
export default function AvailabilityType({ value, onChange }: Props) {
  return (
    <CBadgeItems
      items={[
        { title: "Video", value: AvailabiltyType.Video },
        { title: "Voice", value: AvailabiltyType.Voice },
        { title: "Text", value: AvailabiltyType.Text },
      ]}
      onChange={(value) => onChange && onChange(+value[0])}
      defaultSelected={value !== undefined ? [value] : []}
      isSingular
    />
  );
}
