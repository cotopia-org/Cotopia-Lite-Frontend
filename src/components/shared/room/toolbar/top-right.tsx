import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function ToolbarTopRight({ children }: Props) {
  return <div className='fixed top-4 right-4'>{children}</div>;
}
