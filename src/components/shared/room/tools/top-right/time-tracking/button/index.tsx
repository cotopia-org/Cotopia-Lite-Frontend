import Timer from "../timer"
import ToolButton from "../../../tool-button"
import { ClockIcon } from "@/components/icons"

type Props = {
  isLoading: boolean
  onClick: () => void
  isOpen: boolean
  defaultSeconds: number
}

export default function TimeTrackingButton({
  isLoading,
  onClick,
  isOpen,
  defaultSeconds,
}: Props) {
  return (
    <ToolButton
      isOpen={isOpen}
      open={onClick}
      startIcon={<ClockIcon size={20} />}
      className="!min-w-[135px] !px-2"
      loading={isLoading}
    >
      <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
      <Timer initialSeconds={defaultSeconds}>
        {(time) => <span className="min-w-[60px]">{time}</span>}
      </Timer>
    </ToolButton>
  )
}
