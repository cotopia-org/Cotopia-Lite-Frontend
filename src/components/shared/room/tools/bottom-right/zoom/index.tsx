import { useReactFlow } from "@xyflow/react";
import ZoomActions from "./actions";
import PreviewZoom from "./preview";

export default function ZoomButtonTool() {
  const rf = useReactFlow();
  const zoom = rf.getZoom();

  return (
    <div className='flex flex-col items-center bg-white rounded-xl [&_.zoom-actions]:hover:flex'>
      <ZoomActions />
      <PreviewZoom zoomPercent={zoom * 100} />
    </div>
  );
}
