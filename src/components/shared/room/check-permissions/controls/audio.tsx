import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { useRoomContext } from "@/components/shared/room/room-context";
import useLoading from "@/hooks/use-loading";
import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AudioControl() {
  const { audioState, changePermissionState } = useRoomContext();

  const { startLoading, stopLoading, isLoading } = useLoading();

  const [audioPermission, setAudioPermission] = useState(false);
  useEffect(() => {
    startLoading();
    const getPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioPermission(true);
        stopLoading();
      } catch (err) {
        stopLoading();
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setAudioPermission(false);
          }
        }
      }
    };

    getPermissions();
  }, []);

  let clss = "!bg-destructive !text-white";

  if (audioState === false) clss = "text-black border bg-white";

  let content = (
    <CotopiaIconButton
      variant={"default"}
      className={clss}
      onClick={() => changePermissionState("audio", !audioState)}
      disabled={audioPermission === false}
    >
      <Mic />
    </CotopiaIconButton>
  );

  return audioPermission === false ? (
    <CotopiaTooltip title='Audio permission is not granted!'>
      {content}
    </CotopiaTooltip>
  ) : (
    content
  );
}
