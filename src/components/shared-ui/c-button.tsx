import { Loader } from "lucide-react"
import { Button, ButtonProps } from "../ui/button"
import { MouseEvent, ReactNode } from "react"

export type CotopiaButtonProps = ButtonProps & {
  loading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function CotopiaButton({
  loading,
  startIcon,
  endIcon,
  onClick,
  ...rest
}: CotopiaButtonProps) {
  const isDisabled = rest?.disabled ?? loading ?? false
  let clss = rest?.className ?? ""
  clss += ` gap-x-2 px-2`

  return (
    <Button
      onClick={onClick}
      type="button"
      {...rest}
      className={clss}
      disabled={isDisabled}
    >
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <div className="button-wrapper flex flex-row items-center gap-x-2">
            {!!startIcon && startIcon}
            {rest?.children}
          </div>
          {!!endIcon && <div>{endIcon}</div>}
        </>
      )}
    </Button>
  )
}
