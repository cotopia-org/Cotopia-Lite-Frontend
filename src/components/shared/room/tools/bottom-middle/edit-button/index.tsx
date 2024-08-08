"use client"

import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Pencil } from "lucide-react";

export default function EditButtonTool({...rest}) {
  return (
    <CotopiaIconButton className='text-black' {...rest}>
      <Pencil size={20} />
    </CotopiaIconButton>
  );
}
