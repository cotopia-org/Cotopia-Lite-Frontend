import { Loader } from "lucide-react"
import { Button, ButtonProps } from "../ui/button"
import { ReactNode } from "react"

type Props = ButtonProps & {
  loading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export default function CotopiaButton({
  loading,
  startIcon,
  endIcon,
  ...rest
}: Props) {
  const isDisabled = rest?.disabled ?? loading ?? false
  let clss = rest?.className ?? ""
  clss += ` gap-x-2 px-2`

  return (
    <Button type="button" {...rest} className={clss} disabled={isDisabled}>
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <div className="flex flex-row items-center gap-x-1">
            {!!startIcon && startIcon}
            {rest?.children}
          </div>
          {!!endIcon && <div>{endIcon}</div>}
        </>
      )}
    </Button>
  )
}
