import CotopiaButton from "@/components/shared-ui/c-button";
import { useEffect, useRef, useState } from "react";
import Video from "./video";
import PermissionControls from "./controls";

type Props = {
  onChecked: () => void;
};
export default function CheckPermissions({ onChecked }: Props) {
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setAudioPermission(true);
        setAudioStream(stream);
      } catch (err) {
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setAudioPermission(false);
          }
        }
      }
    };

    getPermissions();
  }, []);

  return (
    <div className='w-[564px] max-w-full mx-auto my-16 flex flex-col items-center gap-y-4'>
      <div className='w-full'>
        <Video />
        <PermissionControls />
      </div>
      <CotopiaButton onClick={onChecked} className='bg-blue-500 min-w-[100px]'>
        Join Now
      </CotopiaButton>
    </div>
  );
}
