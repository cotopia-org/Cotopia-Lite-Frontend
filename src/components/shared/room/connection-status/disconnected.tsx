"use client";

import NotFound from "../../layouts/not-found";
import { Unlink } from "lucide-react";
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

  return (
    <div className='flex flex-col gap-y-4 !bg-background p-4 rounded-lg w-[400px] max-w-full py-8'>
      <NotFound
        title='You disconnected'
        desc='Check your connection status!'
        icon={<Unlink />}
      />
    </div>
  );
}
