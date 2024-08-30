"use client";

import { UserType } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DashboardWrapper } from "./dashboard-wrapper";
import { useSocket } from "../protected-wrapper";
import FullLoading from "@/components/shared/full-loading";

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
  const socket = useSocket();

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    setSocketConnected(!!socket?.connected);

    return () => {
      socket?.emit("leaveRoom");
    };
  }, [socket]);

  if (!socketConnected) return <FullLoading />;

  return (
    <AuthContext.Provider value={{ user }}>
      <DashboardWrapper userToken={accessToken}>{children}</DashboardWrapper>
    </AuthContext.Provider>
  );
}
