"use client";

import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useRoomSpatialContext } from "@/context/room-spatial-context";
import { Pencil } from "lucide-react";

export default function EditButtonTool({ ...rest }) {
  const { setDrawMode, setOpenSidebar, drawMode } = useRoomSpatialContext();

  function handlerDrawMode() {
    setDrawMode((prevState) => !prevState);
    if (!drawMode) {
      setOpenSidebar(false);
    }
  }

  return (
    <CotopiaIconButton className="text-black" onClick={handlerDrawMode} {...rest}>
      <Pencil size={20} />
    </CotopiaIconButton>
  );
}
