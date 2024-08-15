import CModal from "@/components/shared-ui/c-modal";
import React from "react";
import Disconnected, { DisconnectLayoutProps } from "../disconnected";

type Props = DisconnectLayoutProps;

export default function ModalDisconnected({ onReTry }: Props) {
  return (
    <CModal className='flex flex-col items-center justify-center'>
      <Disconnected onReTry={onReTry} />
    </CModal>
  );
}
