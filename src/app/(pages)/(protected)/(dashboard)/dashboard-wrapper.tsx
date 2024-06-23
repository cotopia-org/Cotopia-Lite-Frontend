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
import { UserType } from "@/types/user";

interface DashboardContextValue {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
  socketState?: Socket;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

interface DashboardWrapperProps {
  children: ReactNode;
  userToken: string;
}

export function DashboardWrapper({
  children,
  userToken,
}: DashboardWrapperProps) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const [socketState, setSocketState] = useState<Socket>();
  useEffect(() => {
    socket.connect(__VARS.socketUrl, userToken);

    const instance = socket.getInstance();

    if (instance) setSocketState(instance);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <DashboardContext.Provider
      value={{ sideBarOpen, setSideBarOpen, socketState }}
    >
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

export const useSocket = (event: string, callbackFn: (data: any) => void) => {
  const { socketState } = useDashboardContext();
  useEffect(() => {
    if (!socketState) return;
    socketState.on(event, callbackFn);
    return () => {
      socketState.off(event, callbackFn);
    };
  }, [socketState, event, callbackFn]);

  return socketState as Socket;
};
