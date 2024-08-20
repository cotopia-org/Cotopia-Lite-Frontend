import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import ChatBox from "@/components/shared/chat-box"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import { getUserFullname } from "@/lib/utils"
import { ChatItemType } from "@/types/chat"
import { UserMinimalType } from "@/types/user"
import { ChevronLeft } from "lucide-react"

type Props = {
  messages: ChatItemType[]
  onBack?: () => void
  user: UserMinimalType
  onAdd: (val: string) => void
}
export default function DirectChatBox({
  messages,
  onBack,
  user,
  onAdd,
}: Props) {
  const { user: myAccount } = useProfile()

  return (
    <div className="flex flex-col h-[calc(100vh-224px)]">
      <div className="flex flex-row items-center gap-1">
        <CotopiaIconButton className="text-black/60" onClick={onBack}>
          <ChevronLeft />
        </CotopiaIconButton>
        <p>
          {`Chat with`}
          <strong className="ml-1">{`${getUserFullname(user)}`}</strong>
        </p>
      </div>
      <div className="relative h-full flex flex-col justify-between pt-8">
        <ChatBox items={messages} observer_user_id={myAccount?.id} />
        <ChatUserInput onAdd={onAdd} />
      </div>
    </div>
  )
}
