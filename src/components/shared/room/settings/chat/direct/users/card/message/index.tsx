type Props = {
  message: string
  className?: string
}
export default function Message({ message, className = "" }: Props) {
  return (
    <p className={`text-base text-black/60 truncate w-[200px] ${className}`}>
      {message}
    </p>
  )
}
