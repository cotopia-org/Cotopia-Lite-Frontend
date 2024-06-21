import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  triggerClassName?: string;
};
export default function CotopiaTooltip({
  children,
  title,
  triggerClassName,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={triggerClassName ?? ""}>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <span>{title}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
