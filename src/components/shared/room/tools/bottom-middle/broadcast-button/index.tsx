import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { AudioWaveform } from "lucide-react";

export default function BroadcastButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <AudioWaveform size={20} />
    </CotopiaIconButton>
  );
}
