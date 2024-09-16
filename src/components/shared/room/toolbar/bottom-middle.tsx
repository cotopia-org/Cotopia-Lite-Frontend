import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function ToolbarBottomMiddle({ children }: Props) {
  return (
    <div className='fixed bottom-4 left-[50%] translate-x-[-50%] z-10'>
      {children}
    </div>
  );
}
