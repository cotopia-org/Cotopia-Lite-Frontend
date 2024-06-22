import { Check, Loader } from "lucide-react";

type Props = {};
export default function Loading() {
  return (
    <div className='absolute top-[50%] translate-y-[-50%] right-2'>
      <Loader className='animate-spin' />
    </div>
  );
}
