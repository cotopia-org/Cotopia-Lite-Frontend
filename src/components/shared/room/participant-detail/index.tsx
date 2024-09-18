import { UserMinimalType } from "@/types/user"
import { ReactNode } from "react"
import CotopiaPopover from "@/components/shared-ui/c-popover"
import Details from "./details"

type Props = {
  user: UserMinimalType
  children: ReactNode
}
export default function ParticipantDetails({ user, children }: Props) {
  return (
    <CotopiaPopover
      trigger={children}
      contentClassName="p-0 overflow-hidden border-0 m-0 shadow-md"
    >
      <Details user={user} />
    </CotopiaPopover>
  )
}
