import CotopiaButton from "@/components/shared-ui/c-button"
import PopupBox from "@/components/shared/popup-box"
import PopupBoxChild from "@/components/shared/popup-box/child"
import { Briefcase } from "lucide-react"
import React from "react"
import JobList from "./shapes/job-list"

export default function JobButton() {
  return (
    <PopupBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<Briefcase size={22} />}
          className="bg-white hover:bg-white text-black rounded-xl"
        >
          Jobs
        </CotopiaButton>
      )}
    >
      {(triggerPosition, open, close) => (
        <PopupBoxChild
          onClose={close}
          title="Jobs"
          width={400}
          zIndex={triggerPosition.zIndex}
          top={triggerPosition.top}
          left={triggerPosition.left}
        >
          <JobList />
        </PopupBoxChild>
      )}
    </PopupBox>
  )
}
