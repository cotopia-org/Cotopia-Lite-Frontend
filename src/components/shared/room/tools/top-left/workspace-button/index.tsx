import { FullModalBox } from "@/components/shared/modal-box"
import { GridIcon } from "@/components/icons"
import ToolButton from "../../tool-button"
import { useRoomContext } from "../../../room-context"
import { useApi } from "@/hooks/swr"
import { FetchDataType } from "@/lib/axios"
import { WorkspaceType } from "@/types/workspace"
import Workspaces from "@/components/shared/workspaces/workspaces"
import FullLoading from "@/components/shared/full-loading"

export default function WorkspaceButton() {
  const { data, isLoading } =
    useApi<FetchDataType<WorkspaceType[]>>(`/workspaces`)

  const items: WorkspaceType[] = !!data ? data?.data : []

  const { workspace_id } = useRoomContext()

  let current_workspace: WorkspaceType | undefined = undefined

  if (workspace_id) {
    current_workspace = items.find((w) => +w.id === +workspace_id)
  }

  return (
    <FullModalBox
      title="Workspaces"
      trigger={(open, isOpen) => (
        <ToolButton
          startIcon={<GridIcon size={20} />}
          {...(isOpen ? { className: "[&_svg_path]:fill-blue-700" } : {})}
          open={open}
          isOpen={isOpen}
        >
          {current_workspace?.title ?? "Workspaces"}
        </ToolButton>
      )}
      className="w-[640px]"
    >
      {() => {
        let content = <Workspaces items={items} />
        if (isLoading) content = <FullLoading />
        return content
      }}
    </FullModalBox>
  )
}
