import { __VARS } from "@/app/const/vars";
import { getServerToken } from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ProtectedWrapper from "./protected-wrapper";

type Props = {
  children: ReactNode;
};
export default async function layout({ children }: Props) {
  const { isAuthenticated, token } = await getServerToken();

  if (!isAuthenticated) {
    return redirect(__VARS.loginPage);
  }

  return <ProtectedWrapper token={token}>{children}</ProtectedWrapper>;
}
