'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface DashboardContextValue {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface DashboardWrapperProps {
  children: ReactNode;
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

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