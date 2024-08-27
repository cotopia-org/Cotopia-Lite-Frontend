type Props = {
  username: string
}
export default function Username({ username }: Props) {
  return (
    <strong className="text-gray-600 font-semibold text-sm">{username}</strong>
  )
}
