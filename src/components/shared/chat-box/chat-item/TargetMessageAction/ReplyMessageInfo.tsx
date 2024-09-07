import React, { useCallback } from "react"
import { _BUS } from "@/app/const/bus"
import { Reply } from "lucide-react"
import TargetMessageAction from "."
import { dispatch } from "use-bus"
import colors from "tailwindcss/colors"

interface Props {
  title: string
  desc: string
  onSelect?: () => void
  onClose: () => void
}

const ReplyedMessageInfo = ({ desc, title, onClose, onSelect }: Props) => {
  const selectInfoHandler = useCallback(() => {
    if (onSelect) onSelect()
  }, [onSelect])

  return (
    <TargetMessageAction
      beforeNode={<Reply color={colors.blue[700]} size={18} />}
      title={title}
      description={desc}
      onClose={onClose}
      onSelect={selectInfoHandler}
    />
  )
}

export default ReplyedMessageInfo
