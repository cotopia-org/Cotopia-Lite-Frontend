import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function RoomSidebar({ children }: Props) {
  return (
    <div className='min-h-screen overflow-y-auto'>
      <div className='bg-white min-h-screen w-full'>{children}</div>
    </div>
  );
}
