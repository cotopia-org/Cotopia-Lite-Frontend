"use client";

import { UserType } from "@/types/user";
import { createContext, ReactNode, useContext } from "react";
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
  return (
    <AuthContext.Provider value={{ user }}>
      <DashboardWrapper userToken={accessToken}>{children}</DashboardWrapper>
    </AuthContext.Provider>
  );
}
