import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function ToolbarLeftMiddle({ children }: Props) {
  return (
    <div className='absolute left-2 top-[50%] translate-y-[-50%]'>
      {children}
    </div>
  );
}
