"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { InviteType } from "@/types/invite";
import { toast } from "sonner";

type Props = {
  invite: InviteType;
};

export default function InviteDeclineButton({ invite }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handleDecline = async () => {
    startLoading();
    try {
      await axiosInstance.get(`/invites/${invite.code}/decline`);
      toast.success("You declined your invitation link!");
      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  return (
    <CotopiaButton
      className='w-[120px]'
      size={"sm"}
      variant={"outline"}
      onClick={handleDecline}
      loading={isLoading}
    >
      Declined
    </CotopiaButton>
  );
}
