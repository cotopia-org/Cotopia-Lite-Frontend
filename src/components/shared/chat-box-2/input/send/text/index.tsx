import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { SendHorizonal } from "lucide-react";

type Props = {};

export default function TextButtonHandler() {
  return (
    <CotopiaIconButton type='submit' className='text-black/80'>
      <SendHorizonal />
    </CotopiaIconButton>
  );
}
