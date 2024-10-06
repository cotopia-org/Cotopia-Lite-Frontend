import CotopiaButton from "@/components/shared-ui/c-button";
import ModalBox, { FullModalBox } from "@/components/shared/modal-box";
import React from "react";
import AddChannelForm from "./form";

type Props = {
  workspace_id: string | number;
};

export default function AddChat({ workspace_id }: Props) {
  return (
    <ModalBox
      trigger={(open) => (
        <div className='w-full'>
          <CotopiaButton className='w-full' onClick={open}>
            Add Room
          </CotopiaButton>
        </div>
      )}
    >
      {(open, close) => (
        <AddChannelForm workspace_id={workspace_id} onSubmit={close} />
      )}
    </ModalBox>
  );
}
