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
      style={{
        width: width,
        left: width * index,
        opacity: camera === index + 1 ? 1 : 0,
      }}
      className='absolute flex flex-grow top-0 transition-all overflow-hidden'
    >
      {children}
    </div>
  );
}
