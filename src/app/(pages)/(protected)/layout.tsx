import { __VARS } from "@/app/const/vars";
import getServerSession, { getServerToken } from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ProtectedWrapper from "./protected-wrapper";
import { UserType } from "@/types/user";

type Props = {
  children: ReactNode;
};
export default async function layout({ children }: Props) {
  const { isAuthenticated, data } = await getServerSession();

  if (!isAuthenticated) {
    return redirect(__VARS.loginPage);
  }

  return (
    <ProtectedWrapper
      user={data?.user as UserType}
      token={data?.accessToken as string}
    >
      {children}
    </ProtectedWrapper>
  );
}
