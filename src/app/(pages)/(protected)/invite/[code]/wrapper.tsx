"use client";

import FullLoading from "@/components/shared/full-loading";
import InviteDetails from "@/components/shared/invite-details";
import { useApi } from "@/hooks/swr";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { InviteType } from "@/types/invite";
import { WorkspaceRoomJoinType } from "@/types/room";
import { useRouter } from "next/navigation";

type Props = {
  inviteCode: string;
};
export default function Wrapper({ inviteCode }: Props) {
  const { data, isLoading, error } = useApi<FetchDataType<InviteType>>(
    `/invites/${inviteCode}`
  );

  const invite = !!data ? data?.data : null;

  const router = useRouter();
  const handleJoined = async (type: "room" | "workspace") => {
    switch (type) {
      case "room":
        if (invite?.room)
          try {
            const res = await axiosInstance.get<
              FetchDataType<WorkspaceRoomJoinType>
            >(`/rooms/${invite?.room.id}/join`);
            const livekitToken = res.data.data.token; //Getting livekit token from joinObject

            if (livekitToken) {
              router.push(
                `/workspaces/${invite.workspace.id}/rooms/${invite.room.id}?token=${livekitToken}`
              );
              return;
            }
          } catch (e) {}

        break;
      case "workspace":
        router.push(`/workspaces/all`);
        break;
    }
  };

  let content = null;

  if (invite) content = <InviteDetails item={invite} onJoined={handleJoined} />;
  if (data === undefined || isLoading) content = <FullLoading />;
  if (error)
    content = (
      <div className='text-center mx-auto w-full'>
        There is an error in fetching data!
      </div>
    );

  return <div className='w-[400px] max-w-full mx-auto my-16'>{content}</div>;
}
