import React, { ReactNode } from "react";
import ToolbarTopLeft from "./top-left";
import ToolbarTopRight from "./top-right";
import ToolbarBottomLeft from "./bottom-left";
import ToolbarBottomRight from "./bottom-right";
import ToolbarBottomMiddle from "./bottom-middle";
import ToolbarLeftMiddle from "./left-middle";

type Props = {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomMiddle?: ReactNode;
  bottomRight?: ReactNode;
  leftMiddle?: ReactNode;
};

export default function Toolbar({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  bottomMiddle,
  leftMiddle,
}: Props) {
  return (
    <>
      <ToolbarTopLeft>{topLeft}</ToolbarTopLeft>
      <ToolbarTopRight>{topRight}</ToolbarTopRight>
      <ToolbarBottomLeft>{bottomLeft}</ToolbarBottomLeft>
      <ToolbarBottomMiddle>{bottomMiddle}</ToolbarBottomMiddle>
      <ToolbarBottomRight>{bottomRight}</ToolbarBottomRight>
      <ToolbarLeftMiddle>{leftMiddle}</ToolbarLeftMiddle>
    </>
  );
}
