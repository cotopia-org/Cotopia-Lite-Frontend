import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { CalendarDays } from "lucide-react";

export default function UserCalendarSettingsButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <CalendarDays />
    </CotopiaIconButton>
  );
}
