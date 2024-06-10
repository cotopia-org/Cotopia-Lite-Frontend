import { __VARS } from "@/app/const/vars";
import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "./components/header";
import Dashboard from "./dashboard";
import DashboardMenus, { DashboardMenuItemType } from "./components/menus";
import { Clock, Star } from "lucide-react";

type Props = {
  children: ReactNode;
};

const ITEMS: DashboardMenuItemType[] = [
  {
    title: "Dashboard",
    icon: <Clock />,
    href: `/dashboard`,
  },
  {
    title: "My Workspaces",
    icon: <Star />,
    href: `/workspaces`,
    children: [
      {
        title: "Recent workspaces",
        href: "/workspaces/recent",
      },
      {
        title: "All workspaces",
        href: "/workspaces/all",
      },
    ],
  },
];

export default async function layout({ children }: Props) {
  const { isAuthenticated, data } = await getServerSession();

  //Redirect user to login page
  if (!isAuthenticated) return redirect(__VARS.loginPage);

  return (
    <Dashboard user={data?.user} accessToken={data?.accessToken as string}>
      <main className='w-screen min-h-screen flex flex-col'>
        <Header />
        <div className='grid grid-cols-12 gap-x-32 w-full p-4'>
          <div className='col-span-3'>
            <div className='w-[240px] max-w-full'>
              <DashboardMenus items={ITEMS} className='gap-y-2' />
            </div>
          </div>
          <div className='col-span-7'>
            <div className='w-[666px] mx-auto max-w-full'>{children}</div>
          </div>
          <div className='col-span-2 bg-black/10'>Right</div>
        </div>
      </main>
    </Dashboard>
  );
}
