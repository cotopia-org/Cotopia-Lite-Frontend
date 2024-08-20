import { ChatItemType } from "@/types/chat"
import MyMessage from "./my-message"
import TheirMessage from "./their-message"
import CotopiaContextMenu, {
  ContextItemType,
} from "@/components/shared-ui/c-context-menu"
import { Reply, Pencil } from "lucide-react"
import colors from "tailwindcss/colors"
import MessageBox from "./message/MessageBox"
import { useChatCtx } from "@/context/chat-context"

type Props = {
  item: ChatItemType
  observer_user_id?: number
}
export default function ChatItem({ item, observer_user_id }: Props) {
  const { changeBulk } = useChatCtx()

  const isMyMessage = item.user?.id === observer_user_id

  let menuItems: ContextItemType[] = [
    {
      title: "reply",
      className: "cursor-pointer",
      onClick: () => changeBulk({ message: item, type: "reply" }),
      icon: <Reply color={colors.black} size={14} />,
    },
  ]

  if (isMyMessage) {
    menuItems = [
      {
        title: "edit",
        onClick: () => changeBulk({ message: item, type: "edit" }),
        className: "cursor-pointer",
        hasDivider: true,
        icon: <Pencil color={colors.black} size={14} />,
      },
      ...menuItems,
    ]
  }

  let content = (
    <CotopiaContextMenu
      width={150}
      items={menuItems}
      trigger={<MessageBox item={item} isAvatarVisible={isMyMessage} />}
    />
  )

  return isMyMessage ? (
    <MyMessage>{content}</MyMessage>
  ) : (
    <TheirMessage>{content}</TheirMessage>
  )
}
