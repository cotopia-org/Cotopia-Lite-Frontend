import { __VARS } from "@/app/const/vars";
import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const { isAuthenticated } = await getServerSession();

  //Redirect user to login page
  if (!isAuthenticated) return redirect(__VARS.loginPage);

  return <>{children}</>;
}
