import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import { _BUS } from "@/app/const/bus";
import { useApi } from "@/hooks/swr";
import useQueryParams from "@/hooks/use-query-params";
import useSetting from "@/hooks/use-setting";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { playSoundEffect } from "@/lib/sound-effects";
import { uniqueById } from "@/lib/utils";
import { ScheduleType } from "@/types/calendar";
import { JobType } from "@/types/job";
import { LeaderboardType } from "@/types/leaderboard";
import { WorkspaceRoomJoinType, WorkspaceRoomType } from "@/types/room";
import { UserMinimalType, UserType, WorkspaceUserType } from "@/types/user";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type LeftJoinType = { room_id: number; user: UserMinimalType };

type Props = {
  children: ReactNode;
  room_id: number;
  room?: WorkspaceRoomType;
  onRoomUpdated?: (item: WorkspaceRoomType) => void;
  workspace_id?: string;
};

const RoomCtx = createContext<{
  room?: WorkspaceRoomType;
  room_id: number;
  workspace_id?: string;
  livekit_token?: string;
  openSidebar: (node: ReactNode) => void;
  updateUserCoords: (
    username: string,
    position: { x: number; y: number }
  ) => void;
  closeSidebar: () => void;
  sidebar?: ReactNode;
  videoState: boolean;
  audioState: boolean;
  changePermissionState: (key: "video" | "audio", newValue: boolean) => void;
  joinRoom: () => void;
  leaderboard: LeaderboardType[];
  scheduled: ScheduleType[];
  workpaceUsers: WorkspaceUserType[];
  workspaceJobs: JobType[];
  workingUsers: UserType[];
  onlineUsers: UserMinimalType[];
  usersHaveJobs: UserMinimalType[];
  usersHaveInProgressJobs: UserMinimalType[];
}>({
  room: undefined,
  livekit_token: undefined,
  room_id: 1,
  workspace_id: undefined,
  sidebar: undefined,
  updateUserCoords: (username, position) => {},
  openSidebar: (item) => {},
  closeSidebar: () => {},
  audioState: false,
  videoState: false,
  changePermissionState: (key, newValue) => {},
  joinRoom: () => {},
  leaderboard: [],
  scheduled: [],
  workpaceUsers: [],
  workspaceJobs: [],
  workingUsers: [],
  onlineUsers: [],
  usersHaveJobs: [],
  usersHaveInProgressJobs: [],
});

export const useRoomContext = () => useContext(RoomCtx);

export default function RoomContext({
  children,
  room_id,
  room,
  onRoomUpdated,
  workspace_id,
}: Props) {
  const settings = useSetting();

  const { query } = useQueryParams();
  const livekit_token = query?.token ?? undefined;

  const socket = useSocket();

  const router = useRouter();

  const handleJoinRoom = async () => {
    // axiosInstance
    //   .get<FetchDataType<WorkspaceRoomJoinType>>(`/rooms/${room_id}/join`)
    //   .then((res) => {
    //     const livekitToken = res.data.data.token; //Getting livekit token from joinObject

    //     if (socket) socket.emit("joinedRoom", room_id);

    //     playSoundEffect("joined");

    //     if (livekitToken) {
    //       router.push(
    //         `/workspaces/${workspace_id}/rooms/${room_id}?token=${livekitToken}`
    //       );
    //       return;
    //     }
    //   });

    // Join user to the room by socket request
    if (socket)
      socket.emit("joinedRoom", room_id, () => {
        axiosInstance
          .get<FetchDataType<WorkspaceRoomJoinType>>(`/rooms/${room_id}/join`)
          .then((res) => {
            const livekitToken = res.data.data.token; //Getting livekit token from joinObject

            if (settings.sounds.userJoinLeft) playSoundEffect("joined");

            if (livekitToken) {
              router.push(
                `/workspaces/${workspace_id}/rooms/${room_id}?token=${livekitToken}`
              );
              return;
            }
          });
      });
  };

  const [permissionState, setPermissionState] = useState({
    audio: true,
    video: true,
  });

  const changePermissionState = (key: "video" | "audio", newValue: boolean) => {
    setPermissionState((prev) => ({ ...prev, [key]: newValue }));
  };

  const updateUserCoords = (
    username: string,
    position: { x: number; y: number }
  ) => {
    if (!socket) return;

    if (room === undefined) return;

    if (onRoomUpdated === undefined) return;

    const participants = room?.participants ?? [];

    const participant_index = participants.findIndex(
      (x: any) => x.username === username
    );

    if (participant_index === -1) return onRoomUpdated(room);

    participants[participant_index] = {
      ...participants[participant_index],
      coordinates: `${position.x},${position.y}`,
    };

    if (onRoomUpdated) onRoomUpdated({ ...room, participants });
  };

  useSocket(
    "userLeftFromRoom",
    (data: LeftJoinType) => {
      if (room === undefined) return;

      if (room_id !== data.room_id) return;

      const participants = room?.participants ?? [];

      const newParticipants = participants.filter((x) => x.id !== data.user.id);

      room.participants = newParticipants;

      if (onRoomUpdated) onRoomUpdated(room);
    },
    [room]
  );

  useSocket(
    "userJoinedToRoom",
    (data: LeftJoinType) => {
      if (room === undefined) return;

      if (room_id !== data.room_id) return;

      const participants = room?.participants ?? [];

      room.participants = [...participants, data.user];

      if (onRoomUpdated) onRoomUpdated(room);
    },
    [room]
  );

  const [sidebar, setSidebar] = useState<ReactNode>(<></>);
  const openSidebar = (sidebar: ReactNode) => setSidebar(sidebar);
  const closeSidebar = () => setSidebar(undefined);

  const { data: leaderboardData } = useApi(
    `/workspaces/${workspace_id}/leaderboard`
  );
  const leaderboardUsers: LeaderboardType[] =
    leaderboardData !== undefined ? leaderboardData.data : [];

  const { data: schedulesData } = useApi(
    `/workspaces/${workspace_id}/schedules`
  );
  const schedulesItems: ScheduleType[] =
    schedulesData !== undefined ? schedulesData?.data : [];

  const { data: workspaceUsersData } = useApi(
    `/workspaces/${workspace_id}/users`
  );
  const workpaceUsers =
    workspaceUsersData !== undefined ? workspaceUsersData?.data : [];

  const { data: workpaceJobs } = useApi(`/workspaces/${workspace_id}/jobs`);
  const workpaceJobItems: JobType[] =
    workpaceJobs !== undefined ? workpaceJobs?.data : [];

  let usersHaveSchedules: number[] = [];
  for (let job of workpaceJobItems) {
    for (let jobMember of job.members) {
      usersHaveSchedules.push(jobMember.id);
    }
  }

  const usersHaveJobs = useMemo(() => {
    let users: UserMinimalType[] = [];

    for (let job of workpaceJobItems) {
      for (let member of job.members) {
        users.push(member);
      }
    }

    return uniqueById(users) as UserMinimalType[];
  }, [workpaceJobItems]);

  const usersHaveInProgressJobs = useMemo(() => {
    let users: UserMinimalType[] = [];

    for (let job of workpaceJobItems) {
      if (job.status === "in_progress")
        for (let member of job.members) {
          users.push(member);
        }
    }

    return uniqueById(users) as UserMinimalType[];
  }, [workpaceJobItems]);

  const usersWithInprogressJobIds = usersHaveInProgressJobs.map((x) => x.id);

  console.log("leaderboardUsers", leaderboardUsers);

  const workingUsers = leaderboardUsers
    .filter(
      (x) =>
        x.user.active === 1 &&
        x.user.room_id !== null &&
        x.user.workspace_id === +(workspace_id as string) &&
        usersHaveSchedules.includes(x.user.id) &&
        usersWithInprogressJobIds.includes(x.user.id)
    )
    .map((x) => x.user);

  const onlineUsers = leaderboardUsers
    .filter(
      (x) =>
        x.user.active === 1 &&
        x.user.status === "online" &&
        x.user.workspace_id === +(workspace_id as string)
    )
    .map((x) => x.user);

  return (
    <RoomCtx.Provider
      value={{
        room,
        room_id: +room_id,
        workspace_id,
        sidebar,
        closeSidebar,
        openSidebar,
        updateUserCoords,
        audioState: permissionState.audio,
        videoState: permissionState.video,
        changePermissionState,
        livekit_token: (livekit_token as string) ?? undefined,
        joinRoom: handleJoinRoom,
        leaderboard: leaderboardUsers,
        scheduled: schedulesItems,
        workpaceUsers,
        workspaceJobs: workpaceJobItems,
        workingUsers: workingUsers,
        onlineUsers: onlineUsers,
        usersHaveJobs: usersHaveJobs,
        usersHaveInProgressJobs: usersHaveInProgressJobs,
      }}
    >
      {children}
    </RoomCtx.Provider>
  );
}
