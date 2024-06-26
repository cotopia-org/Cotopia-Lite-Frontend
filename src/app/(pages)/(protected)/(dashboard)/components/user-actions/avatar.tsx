"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../dashboard";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { ChevronDown } from "lucide-react";

export default function UserActionsAvatarButton() {
  const { user } = useAuth();

  if (!user) return;

  //For fallback
  let userShortName = "";
  if (user?.name) userShortName += user.name[0];

  if (userShortName === "" && user.username) userShortName = user.username[0];

  return (
    <div className='flex flex-row items-center'>
      <Avatar>
        <AvatarImage src={undefined} />
        <AvatarFallback className='uppercase'>{userShortName}</AvatarFallback>
      </Avatar>
      <CotopiaIconButton
        size={"sm"}
        variant={"ghost"}
        className='!bg-transparent'
      >
        <ChevronDown size={12} />
      </CotopiaIconButton>
    </div>
  );
}
