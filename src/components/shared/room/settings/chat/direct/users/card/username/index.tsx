type Props = {
  username: string
  className?: string
}
export default function Username({ username, className = "" }: Props) {
  return (
    <strong className={`text-gray-600 font-semibold text-base ${className}`}>
      {username}
    </strong>
  )
}
