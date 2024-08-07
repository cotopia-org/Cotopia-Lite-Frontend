import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Pause } from "lucide-react";

function PauseJob() {
  const handlePause = () => {};
  return (
    <CotopiaIconButton
      onClick={handlePause}
      className="!bg-[#ad9c0066] hover:opacity-80 size-8"
    >
      <Pause size={17} color="#AD9C00" />
    </CotopiaIconButton>
  );
}

export default PauseJob;
