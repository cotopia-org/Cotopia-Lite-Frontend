import PopupBox from "@/components/shared/popup-box"
import PopupBoxChild from "@/components/shared/popup-box/child"
import React from "react"
import ToolButton from "../../tool-button"
import { BriefcaseIcon } from "@/components/icons"
import { useRoomContext } from "../../../room-context"
import { useApi } from "@/hooks/swr"
import { FetchDataType } from "@/lib/axios"
import { urlWithQueryParams } from "@/lib/utils"
import Jobs from "./shapes/job-list/jobs"
import FullLoading from "@/components/shared/full-loading"
import AddJobHandler from "./shapes/add-job"
import { JobType } from "@/types/job"

export default function JobButton() {
  const { workspace_id } = useRoomContext()

  const { data, isLoading, mutate } = useApi<FetchDataType<JobType[]>>(
    urlWithQueryParams(`/users/me/jobs`, { workspace_id }),
    undefined,
    { isPaused: () => workspace_id === undefined }
  )

  let jobItems = (data && data?.data) ?? []
  let job_label = "Create job"
  const active_job = jobItems.find((j) => j.status === "in_progress")
  if (active_job) job_label = active_job.title
  if (!active_job && jobItems.length > 0) job_label = "Start job"

  return (
    <PopupBox
      trigger={(open, isOpen) => (
        <ToolButton
          isOpen={isOpen}
          startIcon={<BriefcaseIcon size={20} />}
          open={open}
        >
          {job_label}
        </ToolButton>
      )}
    >
      {(triggerPosition, open, close) => {
        let content = <Jobs items={jobItems} mutate={mutate} />

        if (isLoading || data === undefined) content = <FullLoading />

        return (
          <PopupBoxChild
            onClose={close}
            title="Jobs"
            width={506}
            zIndex={triggerPosition.zIndex}
            top={triggerPosition.top}
            left={triggerPosition.left}
          >
            <div className="flex w-full flex-col gap-y-6 items-end">
              {content}
              <AddJobHandler workspaceId={workspace_id} onCreated={mutate} />
            </div>
          </PopupBoxChild>
        )
      }}
    </PopupBox>
  )
}
