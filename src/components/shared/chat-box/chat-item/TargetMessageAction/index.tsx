import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { X } from "lucide-react"
import React, { MouseEvent, ReactNode, useCallback } from "react"

interface Props {
  onSelect?: () => void
  onClose?: () => void
  title?: string
  description: string
  beforeNode?: ReactNode
  className?: string
}

const TargetMessageAction = ({
  onClose,
  onSelect,
  description,
  className = "",
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
      className={`flex cursor-pointer bg-blue-700/10 justify-between items-center p-1 px-2 m-2 mb-0 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-x-3 ">
        {beforeNode && beforeNode}
        <div className="w-[3px] h-[30px] bg-blue-700"></div>
        <div className="flex w-fit items-center">
          <div className="flex flex-col w-full items-start">
            {title && (
              <span className="text-blue-700 truncate w-[200px] font-medium text-sm">
                {title}
              </span>
            )}
            <span className="truncate w-[120px] text-sm">{description}</span>
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
