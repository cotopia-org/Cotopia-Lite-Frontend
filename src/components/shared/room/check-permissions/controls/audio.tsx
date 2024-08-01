import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { useRoomContext } from "@/components/shared/room/room-context";
import { Mic } from "lucide-react";
import React from "react";

export default function AudioControl() {
  const { audioState, changePermissionState } = useRoomContext();

  let clss = "!bg-black !text-white";

  if (audioState === false) clss = "text-black border bg-white";

  return (
    <CotopiaIconButton
      variant={"default"}
      className={clss}
      onClick={() => changePermissionState("audio", !audioState)}
    >
      <Mic />
    </CotopiaIconButton>
  );
}
