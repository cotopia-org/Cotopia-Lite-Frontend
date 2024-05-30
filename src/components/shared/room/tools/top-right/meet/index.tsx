import CotopiaButton from "@/components/shared-ui/c-button";
import { CalendarDays } from "lucide-react";
import React from "react";

export default function MeetButtonTool() {
  return (
    <CotopiaButton
      startIcon={<CalendarDays />}
      className='bg-white hover:bg-white text-black rounded-xl'
    >
      Meet
    </CotopiaButton>
  );
}
