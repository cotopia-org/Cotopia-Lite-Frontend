import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { X } from "lucide-react"
import React, { MouseEvent, ReactNode, useCallback } from "react"

interface Props {
  onSelect: () => void
  onClose?: () => void
  title?: string
  description: string
  beforeNode?: ReactNode
}

const TargetMessageAction = ({
  onClose,
  onSelect,
  description,
  title,
  beforeNode,
}: Props) => {
  const closeBoxHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (onClose) onClose()
    },
    [onClose]
  )

  return (
    <div
      onClick={onSelect}
      className="flex cursor-pointer  justify-between items-center p-3 pb-0"
    >
      <div className="flex items-center gap-x-3">
        {beforeNode && beforeNode}
        <div className="border-l-[3px] border-l-blue-700 px-3 flex w-fit items-center">
          <div className="flex flex-col w-full items-start">
            {title && (
              <span className="text-blue-700 truncate w-[200px] font-medium text-sm">
                {title}
              </span>
            )}
            <span className="truncate w-[200px] text-sm">{description}</span>
          </div>
        </div>
      </div>
      {onClose && (
        <CotopiaIconButton
          onClick={(e) => closeBoxHandler(e)}
          className="text-black w-5 h-5  !bg-black/10"
        >
          <X size={14} />
        </CotopiaIconButton>
      )}
    </div>
  )
}

export default TargetMessageAction
