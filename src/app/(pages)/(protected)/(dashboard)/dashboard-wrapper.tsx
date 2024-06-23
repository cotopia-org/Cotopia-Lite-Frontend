"use client";
import { Socket } from "socket.io-client";

import { __VARS } from "@/app/const/vars";
import socket from "@/lib/socket";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface DashboardContextValue {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

interface DashboardWrapperProps {
  children: ReactNode;
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    socket.connect(__VARS.socketUrl);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ sideBarOpen, setSideBarOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }

  return context;
}
