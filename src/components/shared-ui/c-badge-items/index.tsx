import { ReactNode, useEffect, useState } from "react";
import CBadgeItem from "./item";

export type CBadgeValueType = number | string;

export type CBadgeItemType = {
  title: string;
  icon?: ReactNode;
  value: CBadgeValueType;
};

type Props = {
  items: CBadgeItemType[];
  defaultSelected?: CBadgeValueType[];
  onChange: (value: CBadgeValueType[]) => void;
  isSingular?: boolean;
};
export default function CBadgeItems({
  items,
  defaultSelected,
  onChange,
  isSingular,
}: Props) {
  const [selected, setSelected] = useState<CBadgeValueType[]>([]);
  useEffect(() => {
    if (defaultSelected !== undefined) setSelected(defaultSelected);
  }, [defaultSelected]);

  const handleSelect = (value: CBadgeValueType) => {
    let nValue: CBadgeValueType[] = [];

    if (isSingular) {
      nValue = [value];

      setSelected(nValue);

      if (onChange) onChange(nValue);

      return;
    }

    if (selected.includes(value)) {
      nValue = selected.filter((x) => x !== value);
    } else {
      nValue = [...selected, value];
    }

    if (onChange) onChange(nValue);

    setSelected(nValue);
  };
  if (items.length === 0) return;

  return (
    <div className='flex flex-row items-center gap-2 flex-wrap'>
      {items.map((item) => (
        <CBadgeItem
          item={item}
          key={item.value}
          isChecked={selected.includes(item.value)}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
