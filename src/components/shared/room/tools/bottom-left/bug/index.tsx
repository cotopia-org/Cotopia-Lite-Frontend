import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Bug } from "lucide-react";

export default function ReportBugButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <Bug />
    </CotopiaIconButton>
  );
}
