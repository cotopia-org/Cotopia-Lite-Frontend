import CotopiaButton from "@/components/shared-ui/c-button";
import ModalBox, { FullModalBox } from "@/components/shared/modal-box";
import React from "react";
import AddChannelForm from "./form";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Plus } from "lucide-react";

type Props = {
  workspace_id: string | number;
};

export default function AddChat({ workspace_id }: Props) {
  return (
    <ModalBox
      trigger={(open) => (
        <div className='w-full'>
          <CotopiaIconButton
            className='text-gray-600 absolute bottom-4 right-4 z-10 shadow-lg w-12 h-12'
            variant={"ghost"}
            onClick={open}
          >
            <Plus size={24} />
          </CotopiaIconButton>
        </div>
      )}
    >
      {(open, close) => (
        <AddChannelForm workspace_id={workspace_id} onSubmit={close} />
      )}
    </ModalBox>
  );
}
