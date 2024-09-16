import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { Laugh } from "lucide-react";
import React from "react";

export default function UserMood() {
  return (
    <CotopiaTooltip title='Happy!'>
      <Laugh size={16} />
    </CotopiaTooltip>
  );
}
