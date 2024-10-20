"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { __VARS } from "@/app/const/vars";
import RoomContext from "./room-context";
import RoomInner from "./room-inner";
import { WorkspaceRoomJoinType, WorkspaceRoomType } from "@/types/room";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import LiveKitConnectionStatus from "./connection-status";
import CheckPermissions2 from "./check-permissions-2";
import ChatWrapper from "../chat-wrapper";
import { ReactFlowProvider } from "@xyflow/react";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import Disconnected from "./connection-status/disconnected";
import { toast } from "sonner";
import useLoading from "@/hooks/use-loading";
import useBus from "use-bus";
import { _BUS } from "@/app/const/bus";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/redux/store";

type MediaPermission = {
  audio: boolean;
  video: boolean;
};

const DEFAULT_MEDIA_PERMISSIONS = {
  audio: false,
  video: false,
};

const initialState: InitStreamType = {
  loading: false,
  permissions: DEFAULT_MEDIA_PERMISSIONS,
  videoStream: null,
  audioStream: null,
};
const RoomHolderContext = createContext<{
  mediaPermissions: MediaPermission;
  enableVideoAccess: () => void;
  enableAudioAccess: () => void;
  disableVideoAccess: () => void;
  disableAudioAccess: () => void;
  changeStreamState: (stream: MediaStream, type: "video" | "audio") => void;
  stream: InitStreamType;
  stream_loading: boolean;
}>({
  mediaPermissions: DEFAULT_MEDIA_PERMISSIONS,
  enableVideoAccess: () => {},
  enableAudioAccess: () => {},
  disableVideoAccess: () => {},
  disableAudioAccess: () => {},
  changeStreamState: () => {},
  stream: initialState,
  stream_loading: false,
});

export const useRoomHolder = () => useContext(RoomHolderContext);

type Props = {
  token: string;
  workspace_id: string;
  room_id: number;
  isReConnecting?: boolean;
  isSwitching?: boolean;
};

type InitStreamType = {
  loading: boolean;
  permissions: MediaPermission;
  videoStream: MediaStream | null;
  audioStream: MediaStream | null;
};

type StreamActionType =
  | { type: "CHANGE_PERMISSION"; payload: { audio: boolean; video: boolean } }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" }
  | { type: "CHANGE_VALUES"; payload: { [key: string]: any } };

const reducer = (state: InitStreamType, action: StreamActionType) => {
  switch (action.type) {
    case "CHANGE_PERMISSION":
      const permissions = action.payload;
      return { ...state, permissions };
    case "CHANGE_VALUES":
      return { ...state, ...action.payload };
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "CHANGE_VALUES":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default function RoomHolder({
  token,
  workspace_id,
  room_id,
  isReConnecting,
  isSwitching,
}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [permissionChecked, setPermissionChecked] = useState(false);

  const enableVideoAccess = async () => {
    const audioAccess = state.permissions.audio;
    const audioStream = state.audioStream;
    let perm_obj = { audio: !!(audioAccess && audioStream), video: true };
    try {
      dispatch({ type: "START_LOADING" });
      await axiosInstance.post("/settings", { key: "video", value: "on" });
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const obj_to_update = {
        loading: false,
        videoStream: stream,
        permissions: perm_obj,
      };
      dispatch({ type: "CHANGE_VALUES", payload: obj_to_update });
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
    }
  };
  const disableVideoAccess = async () => {
    const audioAccess = state.permissions.audio;
    const audioStream = state.audioStream;
    const videoStream = state.videoStream;
    if (!videoStream) return;
    let perm_obj = { audio: !!(audioAccess && audioStream), video: false };
    try {
      dispatch({ type: "START_LOADING" });
      await axiosInstance.post("/settings", { key: "video", value: "off" });
      const videoTracks = videoStream.getTracks();
      videoTracks.forEach((track) => {
        track.stop();
      });
      const obj_to_update = {
        loading: false,
        permissions: perm_obj,
        videoStream: null,
      };
      dispatch({ type: "CHANGE_VALUES", payload: obj_to_update });
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
    }
  };
  const enableAudioAccess = async () => {
    const videoAccess = state.permissions.video;
    const videoStream = state.videoStream;
    let perm_obj = { video: !!(videoAccess && videoStream), audio: true };
    try {
      dispatch({ type: "START_LOADING" });
      await axiosInstance.post("/settings", { key: "audio", value: "on" });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const obj_to_update = {
        loading: false,
        permissions: perm_obj,
        audioStream: stream,
      };
      dispatch({ type: "CHANGE_VALUES", payload: obj_to_update });
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
    }
  };
  const disableAudioAccess = async () => {
    const videoAccess = state.permissions.video;
    const videoStream = state.videoStream;
    const audioStream = state.audioStream;
    if (!audioStream) return;
    let perm_obj = { video: !!(videoAccess && videoStream), audio: false };
    try {
      dispatch({ type: "START_LOADING" });
      await axiosInstance.post("/settings", { key: "audio", value: "off" });
      const videoTracks = audioStream.getTracks();
      videoTracks.forEach((track) => {
        track.stop();
      });
      const obj_to_update = {
        loading: false,
        permissions: perm_obj,
        audioStream: null,
      };
      dispatch({ type: "CHANGE_VALUES", payload: obj_to_update });
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
    }
  };
  const changeStreamState = (stream: MediaStream, type: "video" | "audio") => {
    let key = "";
    if (type === "video") key = "videoStream";
    if (type === "audio") key = "audioStream";
    if (!key) return;
    dispatch({ type: "CHANGE_VALUES", payload: { [key]: stream } });
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        dispatch({ type: "START_LOADING" });
        const res = await axiosInstance.get("/users/settings");
        const settings: { [key: string]: any }[] = res.data.data ?? [];
        let videoAccess = settings.find((x) => x.key === "video");
        let audioAccess = settings.find((y) => y.key === "audio");
        let video = videoAccess?.value === "on" ? true : false;
        let audio = audioAccess?.value === "on" ? true : false;
        dispatch({
          type: "CHANGE_VALUES",
          payload: {
            loading: false,
            permissions: { video, audio },
          },
        });
      } catch (error) {
        dispatch({ type: "STOP_LOADING" });
      }
    };
    getSettings();
  }, []);

  let content = (
    <LiveKitRoom
      video={state.permissions.video}
      audio
      token={token}
      serverUrl={__VARS.serverUrl}
      options={{
        publishDefaults: {
          videoEncoding: {
            maxBitrate: 1_500_000,
            maxFramerate: 30,
          },
          screenShareEncoding: {
            maxBitrate: 3_000_000,
            maxFramerate: 60,
          },
          dtx: true,
          videoSimulcastLayers: [
            {
              width: 640,
              height: 360,
              resolution: {
                width: 1280,
                height: 720,
                frameRate: 30,
              },
              encoding: {
                maxBitrate: 500_000,
                maxFramerate: 20,
              },
            },
            {
              width: 320,
              height: 180,
              resolution: {
                width: 1280,
                height: 720,
                frameRate: 30,
              },
              encoding: {
                maxBitrate: 150_000,
                maxFramerate: 15,
              },
            },
          ],
        },
        videoCaptureDefaults: {
          deviceId: "",
          facingMode: "user",
          resolution: {
            width: 94,
            height: 94,
            frameRate: 30,
          },
        },

        audioCaptureDefaults: {
          autoGainControl: true,
          deviceId: "",
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 100,
        },
      }}
    >
      <LiveKitConnectionStatus />
      <RoomInner />
    </LiveKitRoom>
  );

  const socket = useSocket();

  const handleReTry = () => {
    console.log("retry to connect!");
  };

  const handleJoin = useCallback(async () => {
    console.log("should join!");
    console.log(socket);
    socket?.emit("joinedRoom", room_id, async () => {
      axiosInstance
        .get<FetchDataType<WorkspaceRoomJoinType>>(`/rooms/${room_id}/join`)
        .then((res) => {
          setPermissionChecked(true);
        })
        .catch((err) => {
          toast.error("Couldn't join to the room!");
        });
    });
  }, [socket, room_id]);
  if (permissionChecked === false && !isReConnecting && !isSwitching)
    content = <CheckPermissions2 onChecked={handleJoin} />;

  return (
    <RoomHolderContext.Provider
      value={{
        mediaPermissions: {
          video: state.permissions.video,
          audio: state.permissions.audio,
        },
        stream_loading: state.loading,
        changeStreamState,
        enableAudioAccess,
        enableVideoAccess,
        disableAudioAccess,
        disableVideoAccess,
        stream: state,
      }}
    >
      <ReactFlowProvider>
        <ChatWrapper>
          <RoomContext room_id={room_id} workspace_id={workspace_id}>
            {socket?.connected === false && (
              <Disconnected onReTry={handleReTry} />
            )}
            {content}
          </RoomContext>
        </ChatWrapper>
      </ReactFlowProvider>
    </RoomHolderContext.Provider>
  );
}
