import CotopiaButton, {
  CotopiaButtonProps,
} from "@/components/shared-ui/c-button"

import { ReactNode } from "react"

type Props = {
  isOpen: boolean
  open: () => void
  startIcon: ReactNode
  children: ReactNode
  className?: string
} & CotopiaButtonProps

const ToolButton = ({
  isOpen,
  open,
  startIcon,
  children,
  className,
  ...rest
}: Props) => {
  let clss =
    "bg-white hover:bg-primaryBackground hover:!text-primary-label [&_svg_path]:hover:!stroke-primary-label relative text-base [&_.button-wrapper]:!gap-x-2 h-[48px] min-w-[80px] !px-4 text-grayscale [&_svg_path]:stroke-grayscale rounded-lg"

  if (isOpen)
    clss +=
      " !text-primary-label [&_svg_path]:!stroke-primary-label bg-primary-background"

  return (
    <div onClick={open}>
      <CotopiaButton
        onClick={open}
        startIcon={startIcon}
        className={`${clss} ${className}`}
        {...rest}
      >
        {children}
      </CotopiaButton>
    </div>
  )
}

export default ToolButton
