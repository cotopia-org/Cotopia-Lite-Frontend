import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Smile } from "lucide-react";
import React from "react";

export default function EmojiButton() {
  return (
    <CotopiaIconButton disabled className='!bg-transparent text-black/60'>
      <Smile />
    </CotopiaIconButton>
  );
}
