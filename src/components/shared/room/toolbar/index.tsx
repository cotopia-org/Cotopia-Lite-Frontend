import React, { ReactNode } from "react";
import ToolbarTopLeft from "./top-left";
import ToolbarTopRight from "./top-right";
import ToolbarBottomLeft from "./bottom-left";
import ToolbarBottomRight from "./bottom-right";

type Props = {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
};

export default function Toolbar({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: Props) {
  return (
    <>
      <ToolbarTopLeft>{topLeft}</ToolbarTopLeft>
      <ToolbarTopRight>{topRight}</ToolbarTopRight>
      <ToolbarBottomLeft>{bottomLeft}</ToolbarBottomLeft>
      <ToolbarBottomRight>{bottomRight}</ToolbarBottomRight>
    </>
  );
}
