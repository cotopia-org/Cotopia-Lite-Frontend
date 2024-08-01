import React from "react";
import CotopiaPopover from "../c-popover";
import CotopiaInput from "../c-input";
import { Calendar } from "@/components/ui/calendar";

export default function CDateInput() {
  return (
    <CotopiaPopover trigger={<CotopiaInput placeholder='Select date' />}>
      <Calendar />
    </CotopiaPopover>
  );
}
