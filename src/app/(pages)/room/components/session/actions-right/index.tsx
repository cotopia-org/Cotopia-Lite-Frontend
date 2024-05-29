import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function ActionsRight({ children }: Props) {
  return <div className='absolute bottom-0 right-0'>{children}</div>;
}
