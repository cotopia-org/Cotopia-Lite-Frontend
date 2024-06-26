import CotopiaButton from "@/components/shared-ui/c-button";
import { Grid2X2 } from "lucide-react";
import React from "react";

export default function MenuButton() {
  return (
    <CotopiaButton
      startIcon={<Grid2X2 />}
      className='bg-white hover:bg-white text-black rounded-xl'
    >
      MenuButton
    </CotopiaButton>
  );
}
