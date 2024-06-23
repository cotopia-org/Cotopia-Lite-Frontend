"use client";

import axiosInstance from "@/lib/axios";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  token: string;
};
export default function ProtectedWrapper({ children, token }: Props) {
  //Be sure axios instance token has been set
  const [tokenSet, setTokenSet] = useState(false);
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setTokenSet(true);
  }, [token]);

  //Show nothing if token is not set
  if (!tokenSet) return;

  return <>{children}</>;
}
