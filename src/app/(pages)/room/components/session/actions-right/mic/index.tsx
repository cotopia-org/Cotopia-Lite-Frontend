import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

export default function MicButton() {
  const [isMute, setIsMute] = useState(false);
  const toggleMute = () => setIsMute((prev) => !prev);

  return (
    <CotopiaIconButton className='w-8 h-8 text-black/60'>
      {isMute ? <MicOff size={22} /> : <Mic size={22} />}
    </CotopiaIconButton>
  );
}
