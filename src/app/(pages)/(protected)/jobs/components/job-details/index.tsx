import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import { CirclePlay, Ellipsis, X } from "lucide-react";
import DueDate from "./due-date";
import JobStatus from "./status";
import Tags from "./tags";
import TimeSpent from "./time-spent";
import InvitedPeople from "./invited-people";

type Props = {
  title: string;
  handleClose: () => void;
};

export default function JobDetails({ title, handleClose }: Props) {
  return (
    <div className="bg-white flex flex-col">
      <header className="px-6 py-4 flex justify-between border-b sticky top-0 left-0 bg-white">
        <div className="flex items-center gap-3">
          <p className="text-xl font-semibold">{title}/ Job Details</p>
        </div>
        <div className="flex items-center gap-4">
          <CotopiaButton
            startIcon={<CirclePlay size={16} />}
            className="bg-[#1B5BFF]"
          >
            Start the Job
          </CotopiaButton>
          <div className="flex gap-2 justify-between">
            <CotopiaIconButton>
              <Ellipsis color="black" />
            </CotopiaIconButton>
            <CotopiaIconButton onClick={handleClose}>
              <X color="black" />
            </CotopiaIconButton>
          </div>
        </div>
      </header>

      <main className="flex-auto grid grid-cols-10">
        <div className="col-span-6 px-6 py-5 h-full border-r">
          <CotopiaInput label="Title" />
          <CotopiaTextarea label="Description" />
        </div>
        <div className="col-span-4 px-6 py-5">
          <JobStatus />
          <DueDate />
          <Tags />
          <TimeSpent />
          <InvitedPeople />
        </div>
      </main>
    </div>
  );
}
