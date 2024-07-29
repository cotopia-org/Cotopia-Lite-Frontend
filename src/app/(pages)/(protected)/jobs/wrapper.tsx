"use client";

import CotopiaButton from "@/components/shared-ui/c-button";
import { Bell, ChevronLeft, Plus, Search } from "lucide-react";
import { ReactNode, useState } from "react";
import Drawer from "./components/drawer";
import { UserMinimalType } from "@/types/user";
import JobCard from "./components/job-card";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { cn } from "@/lib/utils";
import JobModal from "./components/modal/modal";

type Job = {
  title: string;
  summary: string;
  date: Date;
  status: boolean;
  user: UserMinimalType;
  roomName: string;
};

export default function Wrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div className="px-6 w-full h-screen max-w-screen overflow-hidden flex flex-col relative">
      <Drawer
        title="Job Invitations"
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <JobModal
        title="new Job"
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
      <header className="pt-6 pb-2 bg-white flex justify-between sticky top-0 left-0">
        <div className="flex items-center justify-between">
          <span>
            <ChevronLeft className="text-gray-400" />
          </span>
          <span className="text-gray-400">Back to Workspace</span>
        </div>
        <div className="flex gap-6 items-center justify-between">
          <CotopiaInput
            className={cn(
              `bg-gray-100 transition-all ${
                isSearchInputOpen ? "w-80" : "w-0 p-0 border-none"
              }`
            )}
            placeholder="Search Title, description, tags,..."
          />
          {/* <span className="size-6"></span> */}
          <CotopiaIconButton
            onClick={() => setIsSearchInputOpen(!isSearchInputOpen)}
            className="hover:!bg-transparent"
          >
            <Search size={28} className="text-gray-400" />
          </CotopiaIconButton>
          <CotopiaIconButton className="hover:!bg-transparent">
            <Bell
              onClick={handleOpen}
              size={28}
              className="text-gray-400 size-6"
            />
          </CotopiaIconButton>
          <CotopiaButton
            onClick={() => setIsModalOpen(true)}
            className="flex bg-[#1B5BFF]"
          >
            <span>
              <Plus size={20} />
            </span>
            <span>Add a Job</span>
          </CotopiaButton>
        </div>
      </header>
      <hr className="" />

      <main className="flex-auto overflow-y-scroll">
        <h2 className="text-2xl text-gray-400 mt-2">My Jobs</h2>

        <h3 className="font-semibold text-xl text-gray-300 my-4">
          In progress
        </h3>
        <JobCard variant="outline" status="doing" />

        <h3 className="font-semibold text-xl text-gray-300 my-4">To Do</h3>
        <JobCard status="paused" />
        <JobCard status="paused" />
        <JobCard status="paused" />
        <JobCard status="paused" />

        <h3 className="font-semibold text-xl text-gray-300 my-4">Done</h3>
        <JobCard status="paused" />
        <JobCard status="paused" />
        <JobCard status="paused" />
        <JobCard status="paused" />
      </main>
      {/* {children} */}
    </div>
  );
}
