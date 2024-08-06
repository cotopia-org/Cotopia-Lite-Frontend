"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import React from "react";
import CreateWorkspace from ".";
import { Plus } from "lucide-react";
import CRawDialog from "@/components/shared-ui/c-dialog/raw-dialog";

export default function CreateWorkspaceButton() {
  return (
    <CRawDialog
      trigger={(open) => (
        <CotopiaButton
          variant={"ghost"}
          startIcon={<Plus size={16} />}
          onClick={open}
          className='w-full justify-start'
        >
          Create workspace
        </CotopiaButton>
      )}
    >
      {(close) => <CreateWorkspace onClose={close} />}
    </CRawDialog>
  );
}
