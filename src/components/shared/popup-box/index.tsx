import useKeyPress from "@/hooks/use-key-press"
import { ReactNode, useRef, useState } from "react"

type Props = {
  trigger: (open: () => void, isOpen: boolean) => ReactNode
  children?: (
    style: { top: number; left: number; zIndex: number },
    open: () => void,
    close: () => void
  ) => ReactNode
  className?: string
}
export default function PopupBox({ trigger, children, className }: Props) {
  const triggerRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
    setTriggerPosition(undefined)
  }

  useKeyPress("Escape", handleClose)

  const [triggerPosition, setTriggerPosition] = useState<{
    top: number
    left: number
    height: number
    width: number
  }>()

  const handleOpen = () => {
    if (isOpen) return

    const triggerRect = triggerRef.current?.getBoundingClientRect()

    const top = triggerRect?.top ?? 0
    const left = triggerRect?.left ?? 0
    const height = triggerRect?.height ?? 0
    const width = triggerRect?.width ?? 0

    if (top === undefined || left === undefined) return

    setIsOpen(true)
    setTriggerPosition({ top, left, height, width })
  }

  let triggerClss = "trigger transition-all"
  let modalClss = "modaloverlay transition-all"

  if (isOpen) triggerClss += ` fixed z-20 scale-[1.05]`
  if (isOpen)
    modalClss += ` fixed z-10 top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm`

  return (
    <>
      {!!isOpen && (
        <div
          className="placeholder-trigger"
          style={{ ...triggerPosition }}
        ></div>
      )}
      <div
        className={triggerClss}
        style={triggerPosition ? triggerPosition : {}}
        ref={triggerRef}
      >
        {trigger(handleOpen, isOpen)}
      </div>
      {isOpen && <div className={modalClss} onClick={handleClose}></div>}
      {!!children &&
        isOpen &&
        children(
          {
            top: (triggerPosition?.top ?? 0) + (triggerPosition?.height ?? 0),
            left: triggerPosition?.left,
            zIndex: 21,
          } as {
            top: number
            left: number
            zIndex: 21
          },
          handleOpen,
          handleClose
        )}
    </>
  )
}
