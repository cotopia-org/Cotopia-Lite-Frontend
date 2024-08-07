"use client";

import { useMemo } from "react";
import JobHeader from "./components/header";
import JobList from "./components/job-list";
import { UserType } from "@/types/user";
import { useProfile } from "../protected-wrapper";

export default function Wrapper() {
  const { user } = useProfile();
  const fakeData = useMemo(() => {
    return {
      title: "This is another job title",
      summary:
        "Sometimes Your Jobs need a Description for better understanding",
      date: new Date(),
      user: user as UserType,
      roomName: "Cotopia",
    };
  }, []);

  return (
    <div className="px-6 w-full h-screen max-w-screen overflow-hidden flex flex-col relative">
      <JobHeader />

      <hr />

      <main className="flex-auto overflow-y-scroll">
        <h2 className="text-2xl text-[#656B9F] mt-2">My Jobs</h2>

        <JobList
          title="In progress"
          jobList={[{ ...fakeData, status: "doing" }]}
        />
        <JobList title="To Do" jobList={[{ ...fakeData, status: "paused" }]} />
        <JobList title="Done" jobList={[{ ...fakeData, status: "paused" }]} />
      </main>
      {/* {children} */}
    </div>
  );
}
