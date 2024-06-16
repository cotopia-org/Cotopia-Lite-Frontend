import { __VARS } from "@/app/const/vars";
import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "./components/header";
import Dashboard from "./dashboard";
import DashboardMenus, { DashboardMenuItemType } from "./components/menus";
import { Clock, Star } from "lucide-react";
import DashboardLayoutMaker from "@/components/shared/layouts/dashboard";

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
        <DashboardLayoutMaker
          header={<Header />}
          leftSidebar={<DashboardMenus items={ITEMS} className='gap-y-2' />}
        >
          {children}
        </DashboardLayoutMaker>
      </Dashboard>
  );
}
