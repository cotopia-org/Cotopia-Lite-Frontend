import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function ToolbarBottomLeft({ children }: Props) {
  return <div className='fixed bottom-4 left-4 z-10'>{children}</div>;
}
