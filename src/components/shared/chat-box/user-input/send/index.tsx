import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { SendHorizonal } from "lucide-react";

type Props = {
  onClick: () => void;
};
export default function SendButton({ onClick }: Props) {
  return (
    <CotopiaIconButton
      type='submit'
      className='!bg-transparent hover:!bg-white/40 hover:!text-primary text-black/60'
    >
      <SendHorizonal />
    </CotopiaIconButton>
  );
}
