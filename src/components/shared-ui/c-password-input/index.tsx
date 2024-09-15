import { Eye, EyeOff } from "lucide-react"
import { Input, InputProps } from "../../ui/input"
import CotopiaIconButton from "../c-icon-button"
import { useState } from "react"

type Props = InputProps & {
  label?: string
  helperText?: string | boolean
  hasError?: boolean
}

export default function CotopiaPasswordInput({
  label,
  helperText,
  hasError,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const handleToggleShowPassword = () => setShowPassword((prev) => !prev)

  let inputClasss = rest?.className ?? ""
  let helperTextClss = "text-sm font-normal text-black/60"

  if (hasError) {
    inputClasss += ` border !ring-red-600 border-red-600`
    helperTextClss += ` text-red-600`
  }

  return (
    <div className="flex flex-col gap-y-2 relative">
      {label && (
        <strong className="font-semibold text-black/[.87] text-base">
          {label}
        </strong>
      )}
      <div className="relative">
        <Input
          {...rest}
          type={showPassword ? "text" : "password"}
          className={inputClasss}
        />
        <CotopiaIconButton
          className="absolute top-[50%] translate-y-[-50%] right-0 !bg-transparent"
          variant={"ghost"}
          onClick={handleToggleShowPassword}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </CotopiaIconButton>
      </div>
      {helperText && <span className={helperTextClss}>{helperText}</span>}
    </div>
  )
}
