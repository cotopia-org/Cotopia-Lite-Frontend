import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};
export default function TitleEl({ title, children }: Props) {
  return (
    <div className='flex flex-col gap-y-2'>
      <strong>{title}</strong>
      {children}
    </div>
  );
}
