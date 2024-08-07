import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  align?: "center" | "end" | "start";
};
export default function CotopiaPopover({
  trigger,
  children,
  contentClassName,
  align = "end",
}: Props) {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent align={align} className={contentClassName ?? ""}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
