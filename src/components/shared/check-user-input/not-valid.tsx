import { X } from "lucide-react";

type Props = {};
export default function NotValid() {
  return (
    <div className='absolute top-[50%] translate-y-[-50%] right-2'>
      <X className='text-red-700' />
    </div>
  );
}
