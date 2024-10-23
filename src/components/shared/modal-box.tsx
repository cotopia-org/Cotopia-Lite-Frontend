import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { ReactNode, useState } from "react"

type Props = {
  trigger: (open: () => void, isOpen: boolean) => ReactNode
  children?: (open: () => void, close: () => void) => ReactNode
  title?: string
  className?: string
  hasClose?: boolean
}
export default function ModalBox({
  trigger,
  children,
  className,
  title = "",
  hasClose = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  let finalClassName = className ?? ""

  if (!hasClose) finalClassName += ` [&_.right-4]:hidden`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger(handleOpen, isOpen)}</DialogTrigger>
      <DialogContent className={finalClassName ?? ""}>
        <DialogHeader className="flex-row justify-between w-full  items-center">
          {title && (
            <DialogTitle className="text-3xl font-medium">{title}</DialogTitle>
          )}
          <DialogClose className="opacity-70 hover:opacity-100">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        {children ? children(handleOpen, handleClose) : null}
      </DialogContent>
    </Dialog>
  )
}

//Export full Modal
export function FullModalBox({ ...props }: Props) {
  let clss =
    "max-w-full max-h-[calc(100vh-200px)] overflow-y-auto z-[10] p-6 lg:rounded-[20px]"
  if (props?.className) clss += ` ${props.className}`

  return <ModalBox {...props} className={clss} />
}
