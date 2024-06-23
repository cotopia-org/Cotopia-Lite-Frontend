import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Search } from "lucide-react";
import React from "react";

export default function SettingsUserAction() {
  return (
    <CotopiaIconButton>
      <Search className='text-black/60' />
    </CotopiaIconButton>
  );
}
