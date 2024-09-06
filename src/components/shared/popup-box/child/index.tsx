"use client";

import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { CircleMinus, Minimize } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
  top: number;
  left: number;
  zIndex?: number;
  width?: number;
  title: string;
};
export default function PopupBoxChild({
  children,
  onClose,
  top,
  left,
  zIndex,
  width = 300,
  title,
}: Props) {
  return (
    <div
      className='bg-background rounded-lg p-4 fixed mt-4'
      style={{
        width,
        top: top,
        left: left,
        zIndex: zIndex ?? 100,
      }}
    >
      <div className='flex flex-col gap-y-2'>
        <div className='flex flex-row items-center justify-between'>
          <strong>{title}</strong>
          <CotopiaIconButton
            onClick={onClose}
            className='text-yellow-600 !w-[14px] !h-[14px] !px-1'
          >
            <CircleMinus size={14} />
          </CotopiaIconButton>
        </div>
        <hr />
        <div>{children}</div>
      </div>
    </div>
  );
}
