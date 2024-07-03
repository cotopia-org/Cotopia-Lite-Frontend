import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { FullModalBox } from "@/components/shared/modal-box";
import { Bug } from "lucide-react";
import BugReportForm from "./bug-report";

export default function ReportBugButtonTool() {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaIconButton onClick={open} className='text-black'>
          <Bug />
        </CotopiaIconButton>
      )}
      className='w-[640px]'
    >
      {(open, close) => <BugReportForm />}
    </FullModalBox>
  );
}
