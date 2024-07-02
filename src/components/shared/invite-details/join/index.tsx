"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { InviteType } from "@/types/invite";
import { toast } from "sonner";

type Props = {
  invite: InviteType;
  onJoined?: (type: "room" | "workspace" | "job") => void;
};

export default function JoinButton({ invite, onJoined }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const targetInvitation = invite.type;

  const handleJoin = async () => {
    startLoading();
    try {
      await axiosInstance.get(`/invites/${invite.code}/join`);

      toast.success(`You are joining into the ${targetInvitation}.`);

      if (onJoined) onJoined(targetInvitation);
      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  return (
    <CotopiaButton
      className='w-[120px]'
      size={"sm"}
      variant={"default"}
      onClick={handleJoin}
      loading={isLoading}
    >
      Join
    </CotopiaButton>
  );
}
