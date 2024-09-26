import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  contentClassName?: string;
  triggerClassName?: string;
  align?: "center" | "end" | "start";
};
export default function CotopiaPopover({
  trigger,
  children,
  open,
  contentClassName,
  triggerClassName = "",
  align = "end",
}: Props) {
  return (
    <Popover open={open}>
      <PopoverTrigger className={`popover-trigger ${triggerClassName}`}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent align={align} className={contentClassName ?? ""}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
