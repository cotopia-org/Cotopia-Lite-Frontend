'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface AppContextValue {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ sideBarOpen, setSideBarOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  
  return context;
}