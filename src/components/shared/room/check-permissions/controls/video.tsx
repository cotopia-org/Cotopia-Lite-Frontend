import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useRoomContext } from "@/components/shared/room/room-context";
import { Video } from "lucide-react";
import React from "react";
import { useVideoContext } from "../video";

export default function VideoControl() {
  const { getPermissions, stopVideoStream } = useVideoContext();

  const { videoState, changePermissionState } = useRoomContext();

  let clss = "!bg-black !text-white";

  if (videoState === false) clss = "text-black border bg-white";

  const toggleVideo = () => {
    if (videoState) {
      stopVideoStream();
      changePermissionState("video", false);
    } else {
      getPermissions();
      changePermissionState("video", true);
    }
  };

  return (
    <CotopiaIconButton
      variant={"default"}
      className={clss}
      onClick={toggleVideo}
    >
      <Video />
    </CotopiaIconButton>
  );
}
