import CotopiaButton from "@/components/shared-ui/c-button";
import PopupBox from "@/components/shared/popup-box";
import PopupBoxChild from "@/components/shared/popup-box/child";
import { CalendarDays } from "lucide-react";
import React from "react";
import ShapesHandler from "./shapes/handler";

export default function ScheduleButton() {
  return (
    <PopupBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<CalendarDays />}
          className='bg-white hover:bg-white text-black rounded-xl'
        >
          Schedule
        </CotopiaButton>
      )}
      className='w-[551px]'
    >
      {(triggerPosition, open, close) => (
        <PopupBoxChild
          top={triggerPosition.top}
          left={triggerPosition.left}
          zIndex={triggerPosition.zIndex}
          onClose={close}
          title='Schedule'
          width={400}
        >
          <ShapesHandler />
        </PopupBoxChild>
      )}
    </PopupBox>
  );
}
