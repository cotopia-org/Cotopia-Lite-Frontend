import CotopiaButton from "@/components/shared-ui/c-button";
import PopupBox from "@/components/shared/popup-box";
import { Briefcase } from "lucide-react";
import React from "react";

export default function JobButton() {
  return (
    <PopupBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<Briefcase />}
          className='bg-white hover:bg-white text-black rounded-xl'
        >
          Imporving Zombie Feature
        </CotopiaButton>
      )}
      className='w-[551px]'
    >
      {(triggerPosition, open, close) => (
        <div
          className='bg-white rounded-lg p-4 fixed mt-4 w-[551px]'
          style={{ top: triggerPosition.top, zIndex: triggerPosition.zIndex }}
        >
          Hello
        </div>
      )}
    </PopupBox>
  );
}
