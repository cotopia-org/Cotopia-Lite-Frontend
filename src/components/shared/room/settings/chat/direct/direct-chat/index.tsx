import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import ChatBox from "@/components/shared/chat-box"
import NewChatBox from "@/components/shared/chat-box/NewChatBox"
import { getUserFullname } from "@/lib/utils"
import { ChatItemType } from "@/types/chat"
import { UserMinimalType } from "@/types/user"
import { ChevronLeft } from "lucide-react"
import { ReactNode } from "react"

type Props = {
  messages: ChatItemType[]
  onBack?: () => void
  user?: UserMinimalType
  onAdd: (val: string) => void
  inputNode: ReactNode
}
export default function DirectChatBox({
  messages,
  onBack,
  inputNode,
  user,
  onAdd,
}: Props) {
  const { user: myAccount } = useProfile()

  let clss = " min-h-[calc(100%-60px)]"

  if (messages.length < 4) {
    clss = " min-h-[calc(100%-20px)]"
  }

  if (messages.length === 0) {
    clss += " flex items-center justify-center"
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center gap-1">
        <CotopiaIconButton className="text-black/60" onClick={onBack}>
          <ChevronLeft />
        </CotopiaIconButton>
        {user ? (
          <p>
            {`Chat with`}
            <strong className="ml-1">{`${getUserFullname(user)}`}</strong>
          </p>
        ) : null}
      </div>
      <div className="relative h-full flex gap-y-2 flex-col justify-between pt-8">
        <NewChatBox className={clss} observer_user_id={myAccount?.id} />
        {inputNode}
      </div>
    </div>
  )
}
