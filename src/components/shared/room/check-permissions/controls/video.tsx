import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useRoomContext } from "@/components/shared/room/room-context";
import { Video } from "lucide-react";
import React from "react";

export default function VideoControl() {
  const { videoState, changePermissionState } = useRoomContext();

  let clss = "!bg-black !text-white";

  if (videoState === false) clss = "text-black border bg-white";

  return (
    <CotopiaIconButton
      variant={"default"}
      className={clss}
      onClick={() => changePermissionState("video", !videoState)}
    >
      <Video />
    </CotopiaIconButton>
  );
}
