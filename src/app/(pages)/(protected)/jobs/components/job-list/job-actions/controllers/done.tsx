import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Check } from "lucide-react";

function DoneJob() {
  const handleDone = () => {};
  return (
    <CotopiaIconButton
      onClick={handleDone}
      className="!bg-green-600/40 hover:opacity-80 size-8"
    >
      <Check size={17} color="green" />
    </CotopiaIconButton>
  );
}

export default DoneJob;
