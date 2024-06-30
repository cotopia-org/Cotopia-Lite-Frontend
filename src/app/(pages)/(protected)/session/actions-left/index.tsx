import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function ActionsLeft({ children }: Props) {
  return <div className='absolute bottom-0 left-0 z-[2]'>{children}</div>;
}
