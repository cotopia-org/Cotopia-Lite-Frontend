import { WorkspaceType } from "@/types/workspace"
import { useRouter } from "next/navigation"
import WorkspaceAvatar from "./avatar"
import WorkspaceTitle from "./title"
import WorkspaceDate from "./date"
import { MouseEvent, useState } from "react"
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { useRoomContext } from "@/components/shared/room/room-context"
import CotopiaButton from "@/components/shared-ui/c-button"
import WorkspaceActions from "./actions"

type Props = {
  item: WorkspaceType
  is_active?: boolean
}
export default function WorkspaceItem({ item, is_active }: Props) {
  const [localWorkspace, setLocalWorkspace] = useState<WorkspaceType>(item)

  const router = useRouter()

  let avatarTitle = ""
  if (item.title) avatarTitle = localWorkspace.title[0].toUpperCase()

  useSocket("workspaceUpdated", (data: any) => {
    if (data.id === item.id) {
      setLocalWorkspace(data)
    }
  })

  let clss =
    " p-4 h-auto w-full rounded-3xl bg-transparent hover:!bg-gray-100 flex flex-row items-center justify-between cursor-pointer"
  if (is_active) clss += " !bg-grayscale-light"

  const joinWorkspaceHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/workspaces/${localWorkspace.id}`)
  }
  return (
    <div onClick={joinWorkspaceHandler} className={clss}>
      <div className="flex flex-row items-center gap-x-6">
        <WorkspaceAvatar title={avatarTitle} />
        <div className="flex flex-col">
          <WorkspaceTitle title={localWorkspace.title} />
          <WorkspaceDate date={localWorkspace.created_at ?? null} />
        </div>
      </div>
      <WorkspaceActions />
    </div>
  )
}
