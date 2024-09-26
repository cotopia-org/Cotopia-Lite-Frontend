import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import CotopiaPromptContent, { CotopiaPromptType } from "./content"
import { _BUS } from "@/app/const/bus"
import useBus from "use-bus"

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type WithPortalProps = {
  isPortal?: true
  trigger: (open: () => void) => ReactNode
}

type WithoutPortalProps = {
  isPortal: false
  trigger?: (open: () => void) => ReactNode
}

type RemaindPropTypes = {
  afterDesc?: ReactNode
  open?: boolean
}

type Props = RemaindPropTypes &
  (WithPortalProps | WithoutPortalProps) &
  PartiallyOptional<CotopiaPromptType, "onClose">
export default function CotopiaPrompt({
  trigger,
  afterDesc,
  open = false,
  isPortal = true,
  ...rest
}: Props) {
  const [isOpen, setIsOpen] = useState(open)

  const handleOpen = () => setIsOpen(true)

  const handleClose = () => {
    setIsOpen(false)
    if (rest?.onClose) rest.onClose()
  }

  const handleSubmit = () => {
    if (rest?.onSubmit) rest.onSubmit()
  }

  useBus(_BUS.closePrompt, () => {
    handleClose()
  })

  let view = null

  if (isPortal && !!trigger) {
    view = (
      <>
        <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] pt-12">
          <CotopiaPromptContent
            {...rest}
            onSubmit={handleSubmit}
            onClose={handleClose}
            afterDesc={afterDesc}
          />
        </DialogContent>
      </>
    )
  }

  if (!isPortal) {
    view = (
      <>
        {trigger ? (
          <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
        ) : null}
        <DialogOverlay className="z-10" onClick={handleClose} />
        <div className="fixed left-[50%] top-[50%] z-20 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
          <CotopiaPromptContent
            {...rest}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        </div>
      </>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {view}
    </Dialog>
  )
}
