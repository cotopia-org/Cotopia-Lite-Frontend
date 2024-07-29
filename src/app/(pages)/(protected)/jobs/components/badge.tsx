import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  className?: string;
  size?: "sm" | "md";
};

export default function Badge({ icon = null, title, className = "", size }: Props) {
  return (
    <span className={cn("px-2 py-1 rounded-md bg-gray-100 " + className)}>
      <span className="flex gap-1 items-center justify-between">
        {icon}
        <p className={cn(`font-semibold ${size === "sm" ? "text-sm" : "text-base"}`)}>{title}</p>
      </span>
    </span>
  );
}
