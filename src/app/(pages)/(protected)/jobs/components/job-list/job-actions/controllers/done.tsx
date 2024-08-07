import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Check } from "lucide-react";

function DoneJob() {
  const handleDone = () => {};
  return (
    <CotopiaIconButton
      onClick={handleDone}
      className="!bg-[#00ad2566] hover:opacity-80 size-8"
    >
      <Check size={17} color="#00AD26" />
    </CotopiaIconButton>
  );
}

export default DoneJob;
