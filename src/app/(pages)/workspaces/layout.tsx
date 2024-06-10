import { __VARS } from "@/app/const/vars";
import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";
import DashboardLayoutMaker from "@/components/shared/layouts/dashboard";
import { ReactNode } from "react";
import Dashboard from "../(dashboard)/dashboard";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const { isAuthenticated, data } = await getServerSession();

  //Redirect user to login page
  if (!isAuthenticated) return redirect(__VARS.loginPage);

  return (
    <Dashboard user={data?.user} accessToken={data?.accessToken as string}>
      {children}
    </Dashboard>
  );
}
