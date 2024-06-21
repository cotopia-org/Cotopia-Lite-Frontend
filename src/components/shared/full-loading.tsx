import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export default function FullLoading({ className }: Props) {
  return (
    <div
      className={`h-full w-full flex flex-col items-center ${className ?? ""}`}
    >
      <Loader className='animate-spin' />
    </div>
  );
}
