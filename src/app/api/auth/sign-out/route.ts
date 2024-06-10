import { __VARS } from "@/app/const/vars";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function GET() {
  cookies().delete(__VARS.tokenCookieKey);

  return redirect(__VARS.loginPage);
}
