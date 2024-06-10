import { ReactNode } from "react";

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
  return (
    <main className='w-screen min-h-screen flex flex-col'>
      {!!header && header}
      <div className='grid grid-cols-12 gap-x-32 w-full p-4'>
        <div className='col-span-3'>
          <div className='w-[240px] max-w-full'>
            {!!leftSidebar && leftSidebar}
          </div>
        </div>
        <div className='col-span-7'>
          <div className='w-[666px] mx-auto max-w-full'>
            {!!children && children}
          </div>
        </div>
        <div className='col-span-2 bg-black/10'>
          {!!rightSidebar && rightSidebar}
        </div>
      </div>
    </main>
  );
}
