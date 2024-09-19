import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};
export default function TitleEl({ title, children, className }: Props) {
  return (
    <div className={`flex flex-col gap-y-2 ${className}`}>
      <strong>{title}</strong>
      {children}
    </div>
  );
}
