import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useReactFlow } from "@xyflow/react";
import { Minus, Plus } from "lucide-react";
import React from "react";

export default function ZoomActions() {
  const rf = useReactFlow();

  const handleZoomIn = () => {
    rf.zoomIn();
  };

  const handleZoomOut = () => {
    rf.zoomOut();
  };

  return (
    <div className='zoom-actions transition-all hidden flex-col items-center gap-y-2 py-2'>
      <CotopiaIconButton onClick={handleZoomIn} className='text-black'>
        <Plus />
      </CotopiaIconButton>
      <CotopiaIconButton onClick={handleZoomOut} className='text-black'>
        <Minus />
      </CotopiaIconButton>
    </div>
  );
}
