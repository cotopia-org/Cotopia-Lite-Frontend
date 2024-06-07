import { __VARS } from "@/app/const/vars";
import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "./components/header";
import Dashboard from "./dashboard";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const { isAuthenticated, data } = await getServerSession();

  //Redirect user to login page
  if (!isAuthenticated) return redirect(__VARS.loginPage);

  return (
    <Dashboard user={data?.user}>
      <main className='w-screen min-h-screen flex flex-col'>
        <Header />
        {children}
      </main>
    </Dashboard>
  );
}
