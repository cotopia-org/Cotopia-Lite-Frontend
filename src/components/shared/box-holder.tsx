import React, { ReactNode } from "react";
import CotopiaIconButton from "../shared-ui/c-icon-button";
import { CircleMinus } from "lucide-react";

type Props = {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
};
export default function BoxHolder({
  title,
  children,
  onClose,
  className,
}: Props) {
  return (
    <div className={`flex flex-col gap-y-2 ${className ?? ""}`}>
      <div className='flex flex-row items-center justify-between'>
        <strong>{title}</strong>
        {!!onClose && (
          <CotopiaIconButton
            onClick={onClose}
            className='text-yellow-600 !w-[14px] !h-[14px] !px-1'
          >
            <CircleMinus size={14} />
          </CotopiaIconButton>
        )}
      </div>
      <hr />
      <div>{children}</div>
    </div>
  );
}
