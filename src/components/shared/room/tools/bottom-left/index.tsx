import VerticalDivider from "@/components/shared/vertical-divider";
import ReportBugButtonTool from "./bug";
import PingShower from "./ping";
import SocketConnectionState from "./socket-connection-state";
// import QuestionButtonTool from "./question";

export default function BottomLeftTools() {
  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2 gap-x-2'>
      {/* <QuestionButtonTool /> */}
      {/* <VerticalDivider /> */}
      <ReportBugButtonTool />
      <VerticalDivider />
      <PingShower />
      <SocketConnectionState />
    </div>
  );
}
