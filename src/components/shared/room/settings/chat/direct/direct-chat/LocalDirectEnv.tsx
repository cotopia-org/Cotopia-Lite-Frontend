import { useChat } from "@/hooks/chat/use-chat"
import { UserMinimalType } from "@/types/user"
import DirectChatBox from "."

interface Props {
  user: UserMinimalType
  onBack?: () => void
  onAdd: (item: any) => void
}

const LocalDirectEnv = ({ user, onBack, onAdd }: Props) => {
  const { sendToDirect } = useChat()

  const addMessageHandler = async (val: string) => {
    if (!user?.id) return

    try {
      const direct = await sendToDirect(val, user.id)
      if (direct) onAdd(direct.room)
    } catch (error) {}
  }

  return (
    <DirectChatBox
      onAdd={addMessageHandler}
      onBack={onBack}
      user={user}
      messages={[]}
    />
  )
}

export default LocalDirectEnv
