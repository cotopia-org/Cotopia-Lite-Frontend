import CotopiaButton from "@/components/shared-ui/c-button"
import useLoading from "@/hooks/use-loading"
import { UserRoundPlus } from "lucide-react"
import { useRoomContext } from "../../../room-context"
import axiosInstance from "@/lib/axios"
import CotopiaPrompt from "@/components/shared-ui/c-prompt"
import UserSelector from "@/components/shared/user-selector"
import { useState } from "react"
import { UserMinimalType } from "@/types/user"
import { toast } from "sonner"
import { _BUS } from "@/app/const/bus"
import SelectedUser from "./selected-user"
import { InviteType } from "@/types/invite"
import { CodePicker } from "./code-picker"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import colors from "tailwindcss/colors"
import { ProfileAddIcon } from "@/components/icons"

export default function InviteButtonTool() {
  const [selectedUser, setSelectedUser] = useState<UserMinimalType>()

  const { room_id } = useRoomContext()
  const { startLoading, stopLoading, isLoading } = useLoading()

  const [invite, setInvite] = useState<InviteType>()

  const handleInviteUser = () => {
    if (room_id === undefined) return

    if (selectedUser === undefined) {
      toast.error("Please select at least a user to invite")
      return
    }

    startLoading()
    axiosInstance
      .post(`/invites`, {
        model: "room",
        model_id: room_id,
        user_id: selectedUser.id,
      })
      .then((res) => {
        setInvite(res.data.data)
        setSelectedUser(undefined)
        stopLoading()
      })
      .catch((res) => {
        stopLoading()
      })
  }

  return (
    <>
      {invite !== undefined && (
        <CodePicker
          code={invite.code}
          onCancel={() => setInvite(undefined)}
          onCopy={() => {}}
        />
      )}
      {invite === undefined && (
        <CotopiaPrompt
          onClose={() => {
            setInvite(undefined)
          }}
          onSubmit={handleInviteUser}
          title="Invite user"
          description=""
          // description='You are inviting user to this room, are you sure?'
          afterDesc={
            <>
              <UserSelector
                defaultSelectedId={selectedUser?.id}
                onPick={setSelectedUser}
                afterTitle={
                  selectedUser !== undefined && (
                    <SelectedUser
                      user={selectedUser}
                      onDelete={() => setSelectedUser(undefined)}
                    />
                  )
                }
              />
            </>
          }
          trigger={(open) => (
            <CotopiaIconButton onClick={open} className="w-6 h-6">
              <ProfileAddIcon size={20} color={colors.black} />
            </CotopiaIconButton>
          )}
        />
      )}
    </>
  )
}
