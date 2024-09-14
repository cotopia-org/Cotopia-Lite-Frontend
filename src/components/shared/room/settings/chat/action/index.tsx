import CotopiaButton from "@/components/shared-ui/c-button";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function SettingsChatAction() {
  return (
    <div className='flex flex-row items-center'>
      {["Rooms", "Direct"].map((item) => (
        <CotopiaButton variant={"link"} key={item}>
          {item}
        </CotopiaButton>
      ))}
    </div>
  );
}
