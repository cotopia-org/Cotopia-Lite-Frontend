import { ReactNode } from "react"
import UserAvatar from "../user-avatar"

export type MinimalParticipantType = {
  id: number
  title: string
  toolTipTitle?: string
  wrapper?: React.ComponentType<any>
  className?: string
  src?: string
}

type Props = {
  items: MinimalParticipantType[]
  render?: (item: MinimalParticipantType, content: ReactNode) => ReactNode
}

export default function Avatars({ items, render }: Props) {
  return (
    <div className="flex flex-row gap-1 items-start flex-wrap">
      {items.map((item, key) => {
        let content = <UserAvatar {...item} key={key} />
        return render ? render(item, content) : content
      })}
    </div>
  )
}
