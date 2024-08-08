"use client";

import { cn } from "@/lib/utils";
import { Ellipsis, X } from "lucide-react";
import InviteCard from "./invite-card";
import InviteList from "./invite-list";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
};

const fakeData = [
  {
    title: "This is another job title",
    subTitle: "Sometimes Your Jobs need a Description for better understanding",
    username: "Sara Ranjbar",
    avatar: "",
    date: new Date(),
  },
];

export default function Drawer({ title, isOpen, handleClose }: Props) {
  return (
    <>
      <div
        className={`fixed bg-gray-900/40 z-10 w-screen h-screen top-0 left-0 ${
          isOpen ? "inline-block" : "hidden"
        }`}
      >
        <div
          className={cn(
            `w-[500px] px-6 py-4 h-screen max-h-screen overflow-y-auto bg-white absolute z-50 transition-all duration-100 ${
              isOpen ? "right-0" : "-right-full"
            }`
          )}
        >
          <div className="flex justify-between items-center">
            <CotopiaIconButton onClick={handleClose} className="text-black">
              <X />
            </CotopiaIconButton>
            <p className="text-lg font-bold">{title}</p>
          </div>

          <InviteList inviteList={fakeData} title="My Invitation" />
          <InviteList inviteList={fakeData} title="Job Invitations" />

        </div>
      </div>
    </>
  );
}
