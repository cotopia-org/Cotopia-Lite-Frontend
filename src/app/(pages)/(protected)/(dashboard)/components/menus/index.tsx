import { ReactNode } from "react";
import DashboardMenuItem from "./item";

export type DashboardMenuItemType = {
  title: string;
  href: string;
  icon?: ReactNode;
  children?: DashboardMenuItemType[];
  after?: ReactNode;
  showByDefault?: boolean;
};

type Props = {
  items: DashboardMenuItemType[];
  className?: string;
  isChild?: boolean;
};

export default function DashboardMenus({ items, className, isChild }: Props) {
  return (
    <ul className={`flex flex-col ${className ?? ""}`}>
      {items.map((item, key) => (
        <DashboardMenuItem isChild={isChild} item={item} key={key} />
      ))}
    </ul>
  );
}
