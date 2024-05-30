"use client";

import {
  LayoutContext,
  useEnsureCreateLayoutContext,
} from "@livekit/components-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function RoomWrapper({ children }: Props) {
  const contextValues = useEnsureCreateLayoutContext();

  return (
    <LayoutContext.Provider value={contextValues}>
      {children}
    </LayoutContext.Provider>
  );
}
