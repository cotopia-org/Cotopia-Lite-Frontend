import { Loader } from "lucide-react";

export default function FullLoading() {
  return (
    <div className='h-full w-full flex flex-col items-center'>
      <Loader className='animate-spin' />
    </div>
  );
}
