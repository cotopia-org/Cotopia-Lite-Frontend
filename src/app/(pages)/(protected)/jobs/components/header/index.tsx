import CotopiaButton from "@/components/shared-ui/c-button";
import { ChevronLeft } from "lucide-react";
import JobInvitation from "../job-Invitations";
import JobSearch from "./search-input";
import NewJob from "./new-job";

function JobHeader() {
  return (
    <header className="pt-6 pb-2 bg-white flex justify-between sticky top-0 left-0">
      <CotopiaButton
        className="text-slate-600"
        startIcon={<ChevronLeft />}
        variant={"ghost"}
      >
        Back to Workspace
      </CotopiaButton>
      <div className="flex gap-6 items-center justify-between">
        <JobSearch />
        <JobInvitation />
        <NewJob />
      </div>
    </header>
  );
}

export default JobHeader;
