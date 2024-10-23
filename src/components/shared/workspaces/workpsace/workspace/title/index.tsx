type Props = {
  title: string
}
export default function WorkspaceTitle({ title }: Props) {
  return (
    <strong className="font-medium text-grayscale-paragraph">{title}</strong>
  )
}
