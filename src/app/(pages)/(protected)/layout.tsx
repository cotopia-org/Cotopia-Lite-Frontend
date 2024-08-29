import { __VARS } from "@/app/const/vars"
import getServerSession from "@/lib/server-session"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import ProtectedWrapper from "./protected-wrapper"
import { UserType } from "@/types/user"
import ReduxWrapper from "@/store/redux/Wrapper"

type Props = {
  children: ReactNode
}
export default async function layout({ children }: Props) {
  const { isAuthenticated, data } = await getServerSession()

  if (!isAuthenticated) {
    return redirect(__VARS.loginPage)
  }

  return (
    <ReduxWrapper>
      <ProtectedWrapper
        user={data?.user as UserType}
        token={data?.accessToken as string}
      >
        {children}
      </ProtectedWrapper>
    </ReduxWrapper>
  )
}
