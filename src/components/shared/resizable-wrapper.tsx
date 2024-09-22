import { ReactNode } from "react"

interface Props {
  children: () => ReactNode
}

const ResizableWrapper = ({ children }: Props) => {
  return <div>resizable wrapper</div>
}

export default ResizableWrapper
