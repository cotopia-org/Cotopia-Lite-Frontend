import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export default function CModal({ children, className }: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black/20 backdrop-blur-md z-10  ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
