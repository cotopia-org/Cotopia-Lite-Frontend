import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Play } from "lucide-react";

function PlayJob() {
  const handlePlay = () => {};
  return (
    <CotopiaIconButton
      onClick={handlePlay}
      className="!bg-[#1b5cff66] hover:opacity-80 size-8"
    >
      <Play size={17} color="#1B5BFF" />
    </CotopiaIconButton>
  );
}

export default PlayJob;
