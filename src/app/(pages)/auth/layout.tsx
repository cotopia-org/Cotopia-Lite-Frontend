import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default async function layout({ children }: Props) {
  const { isAuthenticated } = await getServerSession();

  if (isAuthenticated) return redirect("/");

  return <>{children}</>;
}
