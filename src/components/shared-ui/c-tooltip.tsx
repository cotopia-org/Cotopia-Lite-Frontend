import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipTriggerProps } from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  triggerClassName?: string;
  tooltipTriggerProps?: TooltipTriggerProps;
};
export default function CotopiaTooltip({
  children,
  title,
  triggerClassName,
  tooltipTriggerProps,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          {...tooltipTriggerProps}
          className={triggerClassName ?? ""}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <span>{title}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
