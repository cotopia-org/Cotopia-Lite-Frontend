import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { ScreenShare } from "lucide-react";

export default function ShareScreenButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <ScreenShare size={20} />
    </CotopiaIconButton>
  );
}
