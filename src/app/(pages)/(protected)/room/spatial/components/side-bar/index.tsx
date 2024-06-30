"use client";

import { CalendarDays, ChevronDown, ChevronRight, Hourglass, LayoutGrid, MessageCircle, Plus, SearchIcon, SquareUserRound, User } from "lucide-react";
import { useState } from "react";

export default function RoomSpatialSideBar() {
  const [breakOutMenu, setBreakOutMenu] = useState<boolean>(false);
  const [stageMenu, setStageMenu] = useState<boolean>(false);
  const [workspaceMenu, setWorkspaceMenu] = useState<boolean>(false);

  const sideBarStyle = {
    li: { base: "flex flex-col gap-2 items-start transition-colors hover:text-black cursor-pointer", span: "flex gap-2 items-center" },
    headerIcon: { style: "text-slate-500 hover:text-white hover:bg-blue-700 transition-colors rounded-sm p-1", size: 30 },
    ulIcon: { mainIcon: 18, secondIcon: 20 },
  }

  return (
    <div className="h-screen bg-white/95 col-span-2 p-2 flex flex-col gap-5">

      <div className="flex w-full justify-between items-center">
        <SearchIcon color="gray" />

        <div className="flex gap-3">
          <User className={sideBarStyle.headerIcon.style} size={sideBarStyle.headerIcon.size} />
          <MessageCircle className={sideBarStyle.headerIcon.style} size={sideBarStyle.headerIcon.size} />
          <CalendarDays className={sideBarStyle.headerIcon.style} size={sideBarStyle.headerIcon.size} />
        </div>

      </div>

      <div className="h-full flex flex-col items-start justify-between">
        <ul className="flex flex-col gap-8 font-bold text-sm text-gray-500">

          <li className={sideBarStyle.li.base} onClick={() => setBreakOutMenu(prevState => !prevState)}>
            <span className={sideBarStyle.li.span}>
              {breakOutMenu ? (
                <ChevronRight size={sideBarStyle.ulIcon.secondIcon} />
              ) : (
                <ChevronDown size={sideBarStyle.ulIcon.secondIcon} />
              )}
              <Hourglass size={sideBarStyle.ulIcon.mainIcon} /> Break Out
            </span>

            <div className={`w-full items-center justify-center my-2 ${breakOutMenu ? "flex" : "hidden"}`}>
              Content
            </div>
          </li>

          <li className={sideBarStyle.li.base} onClick={() => setStageMenu(prevState => !prevState)}>
            <span className={sideBarStyle.li.span}>
              {stageMenu ? (
                <ChevronRight size={sideBarStyle.ulIcon.secondIcon} />
              ) : (
                <ChevronDown size={sideBarStyle.ulIcon.secondIcon} />
              )}
              <SquareUserRound size={sideBarStyle.ulIcon.mainIcon} /> Stage
            </span>

            <div className={`w-full items-center justify-center my-2 ${stageMenu ? "flex" : "hidden"}`}>
              Content
            </div>
          </li>

          <li className={sideBarStyle.li.base} onClick={() => setWorkspaceMenu(prevState => !prevState)}>
            <span className={sideBarStyle.li.span}>
              {workspaceMenu ? (
                <ChevronRight size={sideBarStyle.ulIcon.secondIcon} />
              ) : (
                <ChevronDown size={sideBarStyle.ulIcon.secondIcon} />
              )}
              <LayoutGrid size={sideBarStyle.ulIcon.mainIcon} /> Workspace
            </span>

            <div className={`w-full items-center justify-center my-2 ${workspaceMenu ? "flex" : "hidden"}`}>
              Content
            </div>

          </li>
        </ul>

        <div className="flex gap-2 items-center font-semibold w-full justify-center transition-all cursor-pointer hover:bg-white/50 rounded-sm p-2"><Plus /> Add Room</div>
      </div>
    </div>
  )
}