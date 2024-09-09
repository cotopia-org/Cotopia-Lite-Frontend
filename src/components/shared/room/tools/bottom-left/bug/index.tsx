import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { FullModalBox } from "@/components/shared/modal-box";
import { Bug } from "lucide-react";
import BugReportForm from "./bug-report";
import { useRoomContext } from "../../../room-context";

export default function ReportBugButtonTool() {
  const { room_id } = useRoomContext();

  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaIconButton onClick={open} className='text-black'>
          <Bug />
        </CotopiaIconButton>
      )}
      className='w-[640px]'
    >
      {(open, close) => (
        <BugReportForm
          onSubmitted={() => {
            close();
          }}
          model_id={"" + room_id}
          model_type='room'
        />
      )}
    </FullModalBox>
  );
}
