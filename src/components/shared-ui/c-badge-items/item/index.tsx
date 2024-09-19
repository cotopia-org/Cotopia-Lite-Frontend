import { CBadgeItemType } from "..";
import CotopiaButton from "../../c-button";

type Props = {
  item: CBadgeItemType;
  isChecked: boolean;
  onSelect: (value: string | number) => void;
};
export default function CBadgeItem({ item, isChecked, onSelect }: Props) {
  return (
    <CotopiaButton
      onClick={() => onSelect(item.value)}
      variant={isChecked ? "default" : "outline"}
      className='min-w-[80px]'
      startIcon={item.icon}
    >
      {item.title}
    </CotopiaButton>
  );
}
