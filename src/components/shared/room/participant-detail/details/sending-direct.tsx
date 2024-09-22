import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import { SendHorizonal } from "lucide-react";
import { useUserDetail } from ".";

export default function SendingDirect() {
  const { user } = useUserDetail();

  return (
    <div className='flex flex-row items-center gap-x-2'>
      <CotopiaInput
        placeholder='Sending message ...'
        className='flex-1 !ring-offset-0 !outline-none !ring-0'
      />
      <CotopiaIconButton className='text-black w-8 h-8'>
        <SendHorizonal size={16} />
      </CotopiaIconButton>
    </div>
  );
}
