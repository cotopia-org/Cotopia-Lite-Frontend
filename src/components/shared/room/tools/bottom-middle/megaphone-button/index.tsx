import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Megaphone } from "lucide-react";

export default function MegaPhoneButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <Megaphone size={20} />
    </CotopiaIconButton>
  );
}
