import { ReactNode } from "react";
import WorkspaceButton from "../tools/top-left/workspace-button";

type Props = {
  children: ReactNode;
};

export default function TopLeftTools({ children }: Props) {
  return <div className='absolute top-4 right-4'>{children}</div>;
}
