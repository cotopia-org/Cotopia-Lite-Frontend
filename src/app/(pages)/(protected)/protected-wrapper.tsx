"use client"

import { __VARS } from "@/app/const/vars"
import axiosInstance from "@/lib/axios"
import socket from "@/lib/socket"
import ReduxWrapper from "@/store/redux/Wrapper"
import { UserType } from "@/types/user"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { Socket } from "socket.io-client"

type Props = {
  children: ReactNode
  token: string
  user: UserType
}

const ProfileContext = createContext<{
  user: UserType
  token?: string
  socketState?: Socket
}>({
  user: {} as any,
  token: undefined,
  socketState: undefined,
})

export const useProfile = () => useContext(ProfileContext)

export const useSocket = (
  event?: string,
  cb?: (data: any) => void,
  deps?: any[]
) => {
  const { socketState } = useProfile()
  useEffect(() => {
    if (!event) return
    if (!cb) return
    if (socketState === undefined) return
    socketState.on(event, cb)
    return () => {
      socketState.off(event, cb)
    }
  }, [socketState, event, deps])

  return socketState
}

export default function ProtectedWrapper({ children, token, user }: Props) {
  //Be sure axios instance token has been set
  const [tokenSet, setTokenSet] = useState(false)
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setTokenSet(true)
  }, [token])

  const [socketState, setSocketState] = useState<Socket>()
  useEffect(() => {
    socket.connect(__VARS.socketUrl, token)

    const instance = socket.getInstance()

    if (instance)
      instance?.on("connect", () => {
        setSocketState(instance)
      })

    return () => {
      socket.disconnect()
    }
  }, [token])

  //Show nothing if token is not set
  if (!tokenSet) return

  return (
    <ReduxWrapper>
      <ProfileContext.Provider value={{ user, socketState, token }}>
        {children}
      </ProfileContext.Provider>
    </ReduxWrapper>
  )
}
