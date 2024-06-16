'use client';
import React, { ReactNode } from "react";
import useWindowSize from "@/hooks/use-window-size";
import { useAppContext } from "@/context";

type Props = {
  leftSidebar?: ReactNode;
  children?: ReactNode;
  rightSidebar?: ReactNode;
  header?: ReactNode;
};
export default function DashboardLayoutMaker({
  leftSidebar,
  children,
  rightSidebar,
  header,
}: Props) {
  const { windowSize } = useWindowSize();
  const { sideBarOpen } = useAppContext();

  return (
    <main className='w-screen min-h-screen flex flex-col'>
      {!!header && header}
      <div className='grid lg:grid-cols-12 gap-4 w-full p-4'>

        {/* In Display Biger than or = 1020 */}
        {windowSize.windowWidth >= 1020 ? (
          <div className="col-span-3">
            {/* w-15 => 15 rem = 240px */}
            <div className='w-15 max-w-full'>
              {!!leftSidebar && leftSidebar}
            </div>
          </div>

          // In Dispaly Smaller than or = 1020
        ) : windowSize.windowWidth <= 1020 && sideBarOpen && (
          <div className="col-span-7">
            {/* w-15 => 15 rem = 240px */}
            <div className='w-15 max-w-full'>
              {!!leftSidebar && leftSidebar}
            </div>
          </div>
        )}

        <div className='col-span-7'>
          <div className='md:m-wide mx-auto max-w-full'>
            {!!children && children}
          </div>

        </div>

        {windowSize.windowWidth >= 1020 && (
          <div className='col-span-2 bg-black/10'>
            {!!rightSidebar && rightSidebar}
          </div>
        )}
      </div>

    </main>
  );
}