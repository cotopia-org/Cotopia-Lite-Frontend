"use client";
import Draggable from "react-draggable";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DraggableComponent({ children }: Props) {
  return (
    <Draggable>
      <div>{children}</div>
    </Draggable>
  );
}
