import { ReactNode } from "react";

type Props = {
  title: string;
  action?: ReactNode;
  children?: ReactNode;
};
export default function Section({ title, action, children }: Props) {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='font-medium text-gray-700 text-3xl'>{title}</h2>
        {!!action && action}
      </div>
      {!!children && <div className='children'>{children}</div>}
    </div>
  );
}
