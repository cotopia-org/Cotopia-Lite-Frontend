import AudioControl from "./audio";
import VideoControl from "./video";

export default function PermissionControls() {
  return (
    <div className='flex flex-row items-center gap-x-2 justify-center py-8'>
      <VideoControl />
      <AudioControl />
    </div>
  );
}
