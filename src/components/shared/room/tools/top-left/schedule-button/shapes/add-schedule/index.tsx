import CotopiaButton from "@/components/shared-ui/c-button";
import { FullModalBox } from "@/components/shared/modal-box";
import { Plus } from "lucide-react";
import React from "react";
import AddScheduleContent from "./content";

type Props = {
  onDelete: () => void;
  onCreated: () => void;
};

export default function AddScheduleButton({ onDelete, onCreated }: Props) {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaButton startIcon={<Plus />} onClick={open}>
          Add Schedule
        </CotopiaButton>
      )}
      className='w-[640px]'
    >
      {(open, close) => (
        <AddScheduleContent
          onClose={close}
          onCreated={() => {
            if (onCreated) onCreated();
            close();
          }}
        />
      )}
    </FullModalBox>
  );
}
