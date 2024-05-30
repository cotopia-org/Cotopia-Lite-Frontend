import CotopiaButton from "@/components/shared-ui/c-button";
import { UserRoundPlus } from "lucide-react";
import React from "react";

export default function InviteButtonTool() {
  return (
    <CotopiaButton
      startIcon={<UserRoundPlus />}
      className='bg-white hover:bg-white text-black rounded-xl'
    >
      Invite
    </CotopiaButton>
  );
}
