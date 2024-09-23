import { ReactNode, useEffect } from "react"
import { SquareArrowOutDownRight } from "lucide-react"

interface Props {
  children: ReactNode
  width?: number
  height?: number
}

const ResizableWrapper = ({ children, width = 600, height = 320 }: Props) => {
  let bulletClss = "w-[48px] h-[48px] bg-white shadow-lg rounded-full absolute"

  let bulletsNode = (
    <div
      className={`resizer m-1 z-[2] flex items-center justify-center cursor-nwse-resize right-[-10px] bottom-[-10px] bottom-right ${bulletClss}`}
    >
      <SquareArrowOutDownRight size={26} />
    </div>
  )

  useEffect(() => {
    const makeResizable = (selector: string) => {
      const element = document.querySelector(selector) as HTMLElement
      if (element === null) return
      const resizers = document.querySelectorAll(selector + " .resizer")
      const minimum_size = 20
      let original_width = 0
      let original_height = 0
      let original_mouse_x = 0
      let original_mouse_y = 0

      for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i]
        function resize(e: MouseEvent) {
          e.preventDefault()
          e.stopPropagation()
          if (currentResizer.classList.contains("bottom-right") && element) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height + (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + "px"
            }
            if (height > minimum_size) {
              element.style.height = height + "px"
            }
          }
        }
        function stopResize() {
          window.removeEventListener("mousemove", resize)
        }
        currentResizer.addEventListener("mousedown", function (e: any) {
          e.preventDefault()
          e.stopPropagation()
          original_width = parseFloat(
            getComputedStyle(element, null)
              .getPropertyValue("width")
              .replace("px", "")
          )
          original_height = parseFloat(
            getComputedStyle(element, null)
              .getPropertyValue("height")
              .replace("px", "")
          )
          original_mouse_x = e.pageX
          original_mouse_y = e.pageY
          window.addEventListener("mousemove", resize)
          window.addEventListener("mouseup", stopResize)
        })
      }
    }
    makeResizable(".resizable")
  }, [])

  return (
    <div
      style={{ width, height: height }}
      className="resizable relative [&_.resizer]:opacity-0 [&_.resizer]:hover:opacity-100"
    >
      <div className="resizers h-full w-full box-content">
        {bulletsNode}
        {children}
      </div>
    </div>
  )
}

export default ResizableWrapper
