import { ReactNode } from "react";

type Props = {
  children?: ReactNode,
};
export default function ToolbarLeftMiddle({ children }: Props) {
  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
      {children}
    </div>
  );
}
