import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Minus, Plus } from "lucide-react";
import React from "react";

export default function ZoomActions() {
  return (
    <div className='zoom-actions transition-all hidden flex-col items-center gap-y-2 py-2'>
      <CotopiaIconButton className='text-black'>
        <Plus />
      </CotopiaIconButton>
      <CotopiaIconButton className='text-black'>
        <Minus />
      </CotopiaIconButton>
    </div>
  );
}
