"use client"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import { LocateFixed } from "lucide-react"
import { useStoreApi, useReactFlow } from "@xyflow/react"
import { useUserDetail } from "."
import { useCallback } from "react"
import { useRoomContext } from "../../room-context"
import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper"
import { dispatch } from "use-bus"
import { _BUS } from "@/app/const/bus"
import { __VARS } from "@/app/const/vars"

interface Props {}

const UserNavigate = (props: Props) => {
  const socket = useSocket()

  const { user } = useUserDetail()
  const { user: myAccount } = useProfile()

  const { room } = useRoomContext()
  const rf = useReactFlow()

  const nodes = rf.getNodes()

  const navOnUserHandler = useCallback(() => {
    if (!user || !socket || !myAccount) return
    const targetUser = nodes.find((n) => n.id === user.username)

    const jailNode = nodes.find((n) => n.type === __VARS.jailNodeType)
    const bgNode = nodes.find((n) => n.type === __VARS.backgroundNodeType)

    const bgNodeWidth = bgNode?.measured?.width ?? 0
    const jailNodeWidth = jailNode?.measured?.width ?? 0

    const bgNodeHeight = bgNode?.measured?.height ?? 0
    const jailNodeHeight = jailNode?.measured?.height ?? 0

    const wDiff = (bgNodeWidth - jailNodeWidth) * 1.5
    const hDiff = (bgNodeHeight - jailNodeHeight) / 1.5

    const h = targetUser?.measured?.height
    const w = targetUser?.measured?.width
    const xdimension = targetUser?.position.x
    const ydimension = targetUser?.position.y

    if (h && w && xdimension && ydimension) {
      const x = xdimension + w / 2
      const y = ydimension + h / 2
      const zoom = 1.5

      rf.setCenter(x - wDiff, y - hDiff, { zoom, duration: 1000 })

      const newCoords = `${x + __VARS.teleportMargin},${
        y + __VARS.teleportMargin
      }`
      const sendingObject = {
        room_id: room?.id,
        coordinates: newCoords,
        username: myAccount.username,
      }
      socket.emit("updateCoordinates", sendingObject)
      dispatch({
        type: _BUS.changeMyUserCoord,
        data: {
          ...myAccount,
          coordinates: newCoords,
        },
      })
    }
  }, [user, nodes, myAccount?.username])

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
