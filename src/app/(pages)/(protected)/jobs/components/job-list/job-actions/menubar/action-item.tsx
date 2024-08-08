import CotopiaButton from "@/components/shared-ui/c-button";
import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  onClick: () => void;
};

function ActionItem({ title, icon, onClick }: Props) {
  return (
    <CotopiaButton
      onClick={onClick}
      className="flex justify-start w-full !p-0 text-slate-500"
      variant={"ghost"}
      startIcon={icon}
    >
      {title}
    </CotopiaButton>
  );
}

export default ActionItem;
