"use client";

import { cn } from "@/lib/utils";
import { Ellipsis, X } from "lucide-react";
import InviteCard from "./invite-card";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
};
export default function Drawer({ title, isOpen, handleClose }: Props) {
  return (
    <>
      <div
        className={`fixed bg-[#191b295d] z-10 w-screen h-screen top-0 left-0 ${
          isOpen ? "inline-block" : "hidden"
        }`}
      ></div>
      <div
        className={cn(
          `w-[500px] px-6 py-4 h-screen max-h-screen overflow-y-auto bg-white absolute z-30 transition-all duration-100 ${
            isOpen ? "right-0" : "-right-full"
          }`
        )}
      >
        <div className="flex justify-between">
          <X onClick={handleClose} />
          <p className="text-lg font-bold">{title}</p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">My Invitation</p>
            <Ellipsis size={16} />
          </div>
          <InviteCard variant="outline" seen />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between items-center px-4">
            <p className="text-sm font-semibold">Job Invitations</p>
            <Ellipsis size={16} />
          </div>
          <InviteCard variant="divider" />
          <InviteCard variant="divider" />
          <InviteCard variant="divider" />
          <InviteCard variant="divider" />
        </div>
      </div>
    </>
  );
}
