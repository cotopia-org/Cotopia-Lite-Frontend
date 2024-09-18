import { ReactNode } from "react"
import UserAvatar from "../user-avatar"

type Props = {
  items: {
    title: string
    toolTipTitle?: string
    wrapper?: React.ComponentType<any>
    className?: string
    src?: string
  }[]
  render?: (index: number, content: ReactNode) => ReactNode
}

export default function Avatars({ items, render }: Props) {
  return (
    <div className="flex flex-row gap-1 items-center flex-wrap">
      {items.map((item, key) => {
        let content = <UserAvatar {...item} key={key} />
        return render ? render(key, content) : content
      })}
    </div>
  )
}
