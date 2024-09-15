"use client";

import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { CircleMinus, Minimize } from "lucide-react";
import { ReactNode } from "react";
import BoxHolder from "../../box-holder";

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
      <BoxHolder title={title} onClose={onClose}>
        {children}
      </BoxHolder>
    </div>
  );
}
