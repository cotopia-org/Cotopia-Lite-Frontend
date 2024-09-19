import CBadgeItems from "@/components/shared-ui/c-badge-items";
import { AvailabiltyType } from "@/types/calendar";
import { Mic, Pencil, Video } from "lucide-react";

type Props = {
  value?: AvailabiltyType;
  onChange: (change: AvailabiltyType) => void;
};
export default function AvailabilityType({ value, onChange }: Props) {
  return (
    <CBadgeItems
      items={[
        {
          title: "Video",
          value: AvailabiltyType.Video,
          icon: <Video size={16} />,
        },
        {
          title: "Voice",
          value: AvailabiltyType.Voice,
          icon: <Mic size={16} />,
        },
        {
          title: "Text",
          value: AvailabiltyType.Text,
          icon: <Pencil size={16} />,
        },
      ]}
      onChange={(value) => onChange && onChange(+value[0])}
      defaultSelected={value !== undefined ? [value] : []}
      isSingular
    />
  );
}
