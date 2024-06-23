import CotopiaButton from "@/components/shared-ui/c-button";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function SettingsChatAction() {
  return (
    <CotopiaButton variant={"ghost"} endIcon={<ChevronDown />}>
      Cotopia Lite
    </CotopiaButton>
  );
}
