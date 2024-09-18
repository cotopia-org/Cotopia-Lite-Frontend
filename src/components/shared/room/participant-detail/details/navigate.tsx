"use client"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import { LocateFixed } from "lucide-react"
import { useStoreApi, useReactFlow } from "@xyflow/react"
import { useUserDetail } from "."
import { useCallback } from "react"
import { useRoomContext } from "../../room-context"
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"

interface Props {}

const UserNavigate = (props: Props) => {
  const { user } = useUserDetail()
  const { user: myAccount } = useProfile()
  //   const { setCenter, getNodes } = useReactFlow()

  const { room, updateUserCoords } = useRoomContext()
  const rf = useReactFlow()
  const nodes = rf.getNodes()

  console.log(nodes, room?.participants, user, "NODES")

  const navOnUserHandler = useCallback(() => {
    if (!user) return
    const targetUser = nodes.find((n) => n.id === user.username)

    const h = targetUser?.measured?.height
    const w = targetUser?.measured?.width
    const xdimension = targetUser?.position.x
    const ydimension = targetUser?.position.y

    if (h && w && xdimension && ydimension) {
      const x = xdimension + w / 2
      const y = ydimension + h / 2
      const zoom = rf.getZoom()

      console.log(targetUser, x, y, "XY")
      rf.setCenter(x, y, { zoom, duration: 1000 })
      updateUserCoords(myAccount.username, { x: x + 100, y: y + 100 })
    }

    // console.log(nodes, "Nodes")
  }, [user, nodes, myAccount.username])

  return (
    <CotopiaTooltip title="User navigate">
      <CotopiaIconButton
        onClick={navOnUserHandler}
        size={"icon"}
        className="text-black w-6 h-6"
      >
        <LocateFixed size={16} />
      </CotopiaIconButton>
    </CotopiaTooltip>
  )
}

export default UserNavigate
