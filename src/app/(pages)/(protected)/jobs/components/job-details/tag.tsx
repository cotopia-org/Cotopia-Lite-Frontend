import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type Props = {
  size?: "sm" | "md";
  title: string;
  handleDelete: (input: string) => void;
};

function TagItem({ size = "md", title, handleDelete }: Props) {
  return (
    <span
      className={cn(
        `bg-[#F2F2F2] flex items-center justify-between rounded-lg font-semibold ${
          size === "sm" ? "p-1 gap-1 text-xs" : "py-1 px-2 gap-2 text-sm"
        }`
      )}
    >
      {title}
      <CotopiaIconButton
        className="!bg-transparent !size-4"
        onClick={() => handleDelete(title)}
      >
        <X color="red" size={size === "sm" ? 10 : 16} />
      </CotopiaIconButton>
    </span>
  );
}

export default TagItem;
