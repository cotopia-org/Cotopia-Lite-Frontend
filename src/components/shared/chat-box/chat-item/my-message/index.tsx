import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export default function MyMessage({ children }: Props) {
  return <div className="flex flex-col items-end w-full">{children}</div>
}
