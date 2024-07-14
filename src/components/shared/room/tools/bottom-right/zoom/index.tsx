import ZoomActions from "./actions";
import PreviewZoom from "./preview";

export default function ZoomButtonTool() {
  const currentZoom = 0;

  return (
    <div className='flex flex-col items-center bg-white rounded-xl [&_.zoom-actions]:hover:flex'>
      <ZoomActions />
      <PreviewZoom zoomPercent={currentZoom} />
    </div>
  );
}
