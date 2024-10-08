import React from "react";
import RegisterForm from "./register-form";
import { AuthenticateType } from "@/types/authenticate";
import { cookies } from "next/headers";
import { __VARS } from "@/app/const/vars";

export const metadata = {
  title: "Register",
};

export default async function RegisterPage() {
  async function onRegistered(res: AuthenticateType) {
    "use server";
    cookies().set(__VARS.tokenCookieKey, res.token);
  }

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center'>
      <RegisterForm onRegistered={onRegistered} />
    </main>
  );
}
