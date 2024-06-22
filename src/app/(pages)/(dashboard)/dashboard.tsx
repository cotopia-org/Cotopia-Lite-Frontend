"use client";

import axiosInstance from "@/lib/axios";
import { UserType } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DashboardWrapper } from "./dashboard-wrapper";

type Props = {
  user?: UserType;
  children: ReactNode;
  accessToken: string;
};

const AuthContext = createContext<{ user?: UserType }>({
  user: undefined,
});

export const useAuth = () => useContext(AuthContext);

export default function Dashboard({ user, children, accessToken }: Props) {
  //Be sure axios instance token has been set
  const [tokenSet, setTokenSet] = useState(false);
  useEffect(() => {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    setTokenSet(true);
  }, [accessToken]);

  //Show nothing if token is not set
  if (!tokenSet) return;

  return (
    <AuthContext.Provider value={{ user }}>
      <DashboardWrapper>{children}</DashboardWrapper>
    </AuthContext.Provider>
  );
}
