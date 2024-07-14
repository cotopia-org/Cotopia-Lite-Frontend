import CotopiaButton from "@/components/shared-ui/c-button";
import { FullModalBox } from "@/components/shared/modal-box";
import { Grid2X2 } from "lucide-react";
import React from "react";
import Workspaces from "./workspaces";

export default function WorkspaceButton() {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<Grid2X2 />}
          className='bg-white hover:bg-white text-black rounded-xl'
        >
          Workspaces
        </CotopiaButton>
      )}
      className='w-[640px]'
    >
      {(open, close) => <Workspaces />}
    </FullModalBox>
  );
}
