import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export default function TheirMessage({ children }: Props) {
  return <div className="flex flex-col items-start w-full">{children}</div>
}
