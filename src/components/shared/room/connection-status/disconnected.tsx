"use client";

import { __VARS } from "@/app/const/vars";
import { useEffect } from "react";
export type DisconnectLayoutProps = {
  onReTry?: () => void;
};

export default function Disconnected({ onReTry }: DisconnectLayoutProps) {
  const onReloadHandler = async () => {
    if (onReTry) onReTry();
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      onReloadHandler();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
