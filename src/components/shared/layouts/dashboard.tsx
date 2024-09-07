"use client";
import React, { ReactNode } from "react";
import useWindowSize from "@/hooks/use-window-size";
import { useDashboardContext } from "@/app/(pages)/(protected)/(dashboard)/dashboard-wrapper";

type Props = {
  leftSidebar?: ReactNode;
  children?: ReactNode;
  rightSidebar?: ReactNode;
  header?: ReactNode;
  className?: string;
};
export default function DashboardLayoutMaker({
  leftSidebar,
  children,
  rightSidebar,
  header,
  className,
}: Props) {
  const { windowSize } = useWindowSize();
  const { sideBarOpen } = useDashboardContext();

  let middleContentClass = "col-span-12";

  if (rightSidebar) {
    middleContentClass += ` md:col-span-8`;
  } else {
    middleContentClass += ` md:col-span-10`;
  }

  return (
    <main className={`w-full min-h-screen flex flex-col ${className ?? ""}`}>
      {!!header && header}
      <div className='grid lg:grid-cols-12 gap-4 w-full'>
        {/* In Display Biger than or = 1020 */}
        {windowSize.windowWidth >= 1020 ? (
          <div className='col-span-2 z-[1] relative' id='dashboard-left-col'>
            {/* w-15 => 15 rem = 240px */}
            <div className='w-15 max-w-full px-4 md:px-0'>
              {!!leftSidebar && leftSidebar}
            </div>
          </div>
        ) : (
          // In Dispaly Smaller than or = 1020
          windowSize.windowWidth <= 1020 &&
          sideBarOpen && (
            <div className='col-span-8'>
              {/* w-15 => 15 rem = 240px */}
              <div className='w-15 max-w-full px-4 md:px-0'>
                {!!leftSidebar && leftSidebar}
              </div>
            </div>
          )
        )}

        <div className={middleContentClass}>
          <div className='w-full mx-auto px-4 md:px-0'>
            {!!children && children}
          </div>
        </div>

        {windowSize.windowWidth >= 1020 && rightSidebar && (
          <div className='col-span-2'>{!!rightSidebar && rightSidebar}</div>
        )}
      </div>
    </main>
  );
}
