import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function ToolbarBottomRight({ children }: Props) {
  return <div className='fixed bottom-4 right-4 z-10'>{children}</div>;
}
