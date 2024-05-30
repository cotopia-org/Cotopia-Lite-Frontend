import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Mic } from "lucide-react";

export default function VoiceButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <Mic size={20} />
    </CotopiaIconButton>
  );
}
