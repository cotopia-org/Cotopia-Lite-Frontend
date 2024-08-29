import CotopiaAvatar from "@/components/shared-ui/c-avatar"

type Props = {
  title: string
  src?: string
  className?: string
}

export default function Avatar({ title, src, className = "" }: Props) {
  return <CotopiaAvatar className={className} src={src} title={title} />
}
