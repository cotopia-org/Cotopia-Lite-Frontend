import { AuthenticateType } from "@/types/authenticate";
import SignInForm from "./sign-in-form";
import { cookies } from "next/headers";
import { __VARS } from "@/app/const/vars";

export const metadata = {
  title: "Login to your account",
};

export default async function LoginPage() {
  //Server action
  async function onLoggedIn(res: AuthenticateType) {
    "use server";

    cookies().set(__VARS.tokenCookieKey, res.token);
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center'>
      <SignInForm onLoggedIn={onLoggedIn} />
    </main>
  );
}
