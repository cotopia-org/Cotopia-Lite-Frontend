import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TopLeftTools({ children }: Props) {
  return <div className='fixed top-4 left-4 z-10'>{children}</div>;
}
