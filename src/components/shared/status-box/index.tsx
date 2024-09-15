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
  let bgColor = "rgba(0,0,0,1)"
  let textColor = `rgba(0,0,0,${alpha})`

  switch (variant) {
    case "success":
      textColor = "rgba(56,142,60,1)"
      bgColor = `rgba(56,142,60,${alpha})`
      break
    case "info":
      textColor = "rgba(2,136,209,1)"
      bgColor = `rgba(2,136,209,${alpha})`
      break
    case "warning":
      textColor = "rgba(243, 156, 18, 1)"
      bgColor = `rgba(243, 156, 18, ${alpha})`
      break
    case "error":
      textColor = "rgba(230,74,25,1)"
      bgColor = `rgba(230,74,25,${alpha})`
      break
    default:
    case "default":
      textColor = "rgba(0,0,0,1)"
      bgColor = `rgba(0,0,0,${alpha})`
  }

  return (
    <div
      className={`w-auto inline-flex py-[4px] px-[10px] rounded-[32px] text-[12px] font-medium`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {label}
    </div>
  )
}
