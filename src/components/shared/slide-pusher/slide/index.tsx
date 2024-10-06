import { ReactNode } from "react";
import { useSlides } from "..";

type Props = {
  children: ReactNode;
  index: number;
};
export default function Slide({ children, index }: Props) {
  const { width, camera } = useSlides();

  return (
    <div
      style={{ width: width, transform: `translateX(${width * (camera + 1)})` }}
      className='absolute flex flex-grow top-0 transition-all'
    >
      {children}
    </div>
  );
}
