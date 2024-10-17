"use client";

import NotFound from "../../layouts/not-found";
import { Unlink } from "lucide-react";
import { __VARS } from "@/app/const/vars";
import { useEffect } from "react";
export type DisconnectLayoutProps = {
  onReTry?: () => void;
};

export default function DisconnectedInvisible({
  onReTry,
}: DisconnectLayoutProps) {
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
