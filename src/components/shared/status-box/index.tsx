import { colors } from "@/app/const/vars"

export type StatusBoxVariant =
  | "success"
  | "info"
  | "error"
  | "warning"
  | "default"

type Props = {
  variant: StatusBoxVariant
  label: string
  alpha?: string
}
export default function StatusBox({
  variant = "info",
  label,
  alpha = "0.1",
}: Props) {
  let bgColor = colors.primary.background
  let textColor = colors.primary.body

  switch (variant) {
    case "default":
    case "info":
      textColor = colors.primary.body
      bgColor = colors.primary.background
      break
    case "success":
      textColor = colors.success.default
      bgColor = `rgba(56,142,60,${alpha})`
      break
    case "warning":
      textColor = colors.warning.default
      bgColor = colors.warning.light
      break
    case "error":
      textColor = colors.error.default
      bgColor = `rgba(230,74,25,${alpha})`
      break
  }

  return (
    <div
      className={`w-auto inline-flex py-1 px-3 rounded-lg text-sm font-medium`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {label}
    </div>
  )
}
