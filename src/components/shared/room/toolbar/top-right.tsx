import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function ToolbarTopRight({ children }: Props) {
  return <div className='absolute top-4 right-4 z-10'>{children}</div>;
}
