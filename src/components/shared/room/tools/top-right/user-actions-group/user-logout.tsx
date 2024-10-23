import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import useLoading from "@/hooks/use-loading"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useRoomContext } from "../../../room-context"
import { LogoutIcon } from "@/components/icons"
import colors from "tailwindcss/colors"

export default function UserLogoutButtonTool() {
  const { workspace_id } = useRoomContext()

  const router = useRouter()

  const { startLoading, stopLoading, isLoading } = useLoading()

  const handleBack = () => {
    startLoading()
    axiosInstance
      .get(`/rooms/leave`)
      .then((res) => {
        router.push(`/workspaces/${workspace_id}`)
        stopLoading()
      })
      .catch((err) => {
        stopLoading()
      })
  }

  return (
    <CotopiaIconButton
      disabled={isLoading}
      onClick={handleBack}
      className="w-6 h-6"
    >
      <LogoutIcon size={20} color={colors.red[700]} />
    </CotopiaIconButton>
  )
}
