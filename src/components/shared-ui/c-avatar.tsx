import { AvatarProps } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = AvatarProps & {
  title?: string
  src?: string
}

export default function CotopiaAvatar({ title, src, ...rest }: Props) {
  return (
    <Avatar {...rest}>
      <AvatarImage
        draggable={false}
        className="object-cover object-center"
        src={src}
      />
      <AvatarFallback className="uppercase">{title}</AvatarFallback>
    </Avatar>
  )
}
