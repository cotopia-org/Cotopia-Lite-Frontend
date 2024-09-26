import React, { ReactNode } from "react";
import ToolbarTopLeft from "./top-left";
import ToolbarTopRight from "./top-right";
import ToolbarBottomLeft from "./bottom-left";
import ToolbarBottomRight from "./bottom-right";
import ToolbarBottomMiddle from "./bottom-middle";
import { useRoomContext } from "../room-context";

type Props = {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomMiddle?: ReactNode;
  bottomRight?: ReactNode;
};

export default function Toolbar({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  bottomMiddle,
}: Props) {
  const { sidebar } = useRoomContext();

  let clss = "relative h-screen";

  if (sidebar) {
    clss += ` w-[calc(100%-380px)]`;
  } else {
    clss += ` w-full`;
  }

  return (
    <div className={clss}>
      <ToolbarTopLeft>{topLeft}</ToolbarTopLeft>
      <ToolbarTopRight>{topRight}</ToolbarTopRight>
      <ToolbarBottomLeft>{bottomLeft}</ToolbarBottomLeft>
      <ToolbarBottomMiddle>{bottomMiddle}</ToolbarBottomMiddle>
      <ToolbarBottomRight>{bottomRight}</ToolbarBottomRight>
    </div>
  );
}
