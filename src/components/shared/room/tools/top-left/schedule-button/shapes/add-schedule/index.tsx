import CotopiaButton from "@/components/shared-ui/c-button";
import { FullModalBox } from "@/components/shared/modal-box";
import { Plus } from "lucide-react";
import React from "react";
import AddScheduleContent from "./content";

export default function AddScheduleButton() {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaButton startIcon={<Plus />} onClick={open}>
          Add Schedule
        </CotopiaButton>
      )}
      className='w-[640px]'
    >
      {(open, close) => <AddScheduleContent />}
    </FullModalBox>
  );
}
