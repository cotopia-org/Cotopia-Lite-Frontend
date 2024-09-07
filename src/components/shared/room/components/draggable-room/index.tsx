"use client";

import DraggableComponent, {
  DraggableProps,
} from "@/components/shared/draggable";
import { useScreen } from "@/hooks/use-screen";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
} & DraggableProps;
export default function DraggableRoom({ children, ...rest }: Props) {
  const { height, width } = useScreen();

  const [leftDashboardColWidth, setLeftDashboardColWidth] = useState(0);
  useEffect(() => {
    const leftDashboardWidth = document.getElementById("dashboard-left-col");

    if (!leftDashboardWidth) return;

    setLeftDashboardColWidth(leftDashboardWidth.getBoundingClientRect().width);
  }, []);

  const finalWidth = width + leftDashboardColWidth;

  return (
    <DraggableComponent
      // positionOffset={{
      //   x: (-1 * finalWidth) / 2,
      //   y: (-1 * height) / 2,
      // }}
      bounds={{
        top: 0,
        left: leftDashboardColWidth ?? 0,
        right: finalWidth,
        bottom: height,
      }}
      {...rest}
    >
      {children}
    </DraggableComponent>
  );
}
