import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Mic } from "lucide-react";
import React from "react";

export default function MicButtonHandler() {
  return (
    <CotopiaIconButton type='button' className='text-black/60'>
      <Mic />
    </CotopiaIconButton>
  );
}
