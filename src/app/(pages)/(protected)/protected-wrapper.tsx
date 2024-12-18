"use client";

import { _BUS } from "@/app/const/bus";
import { __VARS } from "@/app/const/vars";
import axiosInstance from "@/lib/axios";
import { playSoundEffect } from "@/lib/sound-effects";
import { useAppSelector } from "@/store/redux/store";
import { UserType } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { dispatch } from "use-bus";

type Props = {
  children: ReactNode;
  user: UserType;
};

const ProfileContext = createContext<{
  user: UserType;
  token?: string;
  socketState?: Socket;
}>({
  user: {} as any,
  token: undefined,
  socketState: undefined,
});

export const useProfile = () => useContext(ProfileContext);

export const useSocket = (
  event?: string,
  cb?: (data: any) => void,
  deps?: any[]
) => {
  const { socketState } = useProfile();
  useEffect(() => {
    if (!event) return;
    if (!cb) return;
    if (socketState === undefined) return;
    socketState.on(event, cb);
    return () => {
      socketState.off(event, cb);
    };
  }, [socketState, event, deps]);

  return socketState;
};

export default function ProtectedWrapper({ children, user }: Props) {
  const { token } = useAppSelector((store) => store.authSlice);

  useEffect(() => {
    if (token === undefined) {
      window.location.href = `/api/auth/sign-out`;
    }
  }, [token]);

  //Be sure axios instance token has been set
  const [tokenSet, setTokenSet] = useState(false);
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setTokenSet(true);
  }, [token]);

  const [socketState, setSocketState] = useState<Socket>();

  useEffect(() => {
    // Create a socket connection
    const socket = io(__VARS.socketUrl, {
      query: {
        userToken: token,
      },
    });

    const onConnect = () => {
      toast.success("Socket connected");
      setSocketState(socket);
      dispatch(_BUS.rejoinRoom);
      dispatch({
        type: _BUS.startWorkTimer,
        id: __VARS.userTimeTrackerId,
      });
    };

    const onDisconnect = () => {
      playSoundEffect("leftMyself");
      toast.error("Socket disconnected");
      setSocketState(undefined);
      dispatch(_BUS.userLeftRoom);
      dispatch({
        type: _BUS.stopWorkTimer,
        id: __VARS.userTimeTrackerId,
      });
    };

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    // Clean up the socket connection on unmount
    return () => {
      toast.error("Socket disconnected");
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  //Show nothing if token is not set
  if (!tokenSet) return;

  return (
    <ProfileContext.Provider value={{ user, socketState, token }}>
      {children}
    </ProfileContext.Provider>
  );
}
