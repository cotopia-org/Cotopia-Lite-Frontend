import { Check } from "lucide-react";

type Props = {
  show?: boolean;
};
export default function Valid({ show }: Props) {
  return (
    <div className='absolute top-[50%] translate-y-[-50%] right-2'>
      <Check className='text-green-700' />
    </div>
  );
}
