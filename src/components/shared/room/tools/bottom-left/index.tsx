import ReportBugButtonTool from "./bug";
import QuestionButtonTool from "./question";

export default function BottomLeftTools() {
  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      <QuestionButtonTool />
      <ReportBugButtonTool />
    </div>
  );
}
