"use client";

import { UserType } from "@/types/user";
import { createContext, ReactNode, useContext } from "react";

type Props = {
  user?: UserType;
  children: ReactNode;
};

const AuthContext = createContext<{ user?: UserType }>({
  user: undefined,
});

export const useAuth = () => useContext(AuthContext);

export default function Dashboard({ user, children }: Props) {
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
