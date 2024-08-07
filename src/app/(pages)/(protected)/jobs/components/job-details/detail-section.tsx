import CotopiaPopover from "@/components/shared-ui/c-popover";
import { cn } from "@/lib/utils";
import { ReactNode, useMemo, useState } from "react";

type Props = {
  title: string;
  content: ReactNode;
  actions?: ReactNode | null;
};

function DetailsSection({ title, content, actions = null }: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="mb-2">{title}</p>
        {actions}
      </div>

      {content}

      <hr className="my-[10px]" />
    </>
  );
}

export default DetailsSection;
