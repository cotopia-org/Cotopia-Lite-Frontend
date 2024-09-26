import { ReactNode } from "react";
import CBadge, { CBadgeProps } from ".";

type Props = CBadgeProps & { children: ReactNode };
export default function CBadgeSimple({ children, ...rest }: Props) {
  return (
    <div className='relative'>
      <CBadge {...rest} className='absolute top-[-8px] right-[-8px]' />
      {children}
    </div>
  );
}
