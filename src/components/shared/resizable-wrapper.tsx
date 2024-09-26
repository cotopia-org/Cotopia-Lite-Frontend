import { ReactNode, useEffect } from "react"
import { SquareArrowOutDownRight } from "lucide-react"

interface Props {
  children: ReactNode
}

const ResizableWrapper = ({ children }: Props) => {
  let bulletClss = "w-[48px] h-[48px] bg-white shadow-lg rounded-full absolute"

  let bulletsNode = (
    <div
      className={`resizer m-1 z-[2] flex items-center justify-center cursor-nwse-resize right-[-10px] bottom-[-10px]  ${bulletClss}`}
    >
      <SquareArrowOutDownRight size={26} />
    </div>
  )

  useEffect(() => {
    const makeResizable = (selector: string) => {
      const element = document.querySelector(selector) as HTMLElement
      const resizerNode = document.querySelector(selector + " .resizer")
      if (element === null || resizerNode === null) return
      const minimum_size = 20
      let start_width = 0
      let start_height = 0
      let start_mouse_x = 0
      let start_mouse_y = 0
      let aspect_ratio = 1 // Default aspect ratio

      function resize(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        if (resizerNode && element) {
          const delta_x = e.clientX - start_mouse_x
          const delta_y = e.clientY - start_mouse_y

          const available_delta =
            Math.abs(delta_x) > Math.abs(delta_y) ? delta_x : delta_y
          let new_width = start_width + available_delta
          let new_height = new_width / aspect_ratio

          // Ensure the new dimensions are above the minimum size
          if (new_width > minimum_size && new_height > minimum_size) {
            element.style.width = new_width + "px"
            element.style.height = new_height + "px"
          }
        }
      }
      function stopResize() {
        window.removeEventListener("mousemove", resize)
      }
      resizerNode.addEventListener("mousedown", function (e: any) {
        e.preventDefault()
        e.stopPropagation()
        start_width = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("width")
            .replace("px", "")
        )
        start_height = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("height")
            .replace("px", "")
        )
        aspect_ratio = start_width / start_height // Calculate the aspect ratio

        start_mouse_x = e.clientX
        start_mouse_y = e.clientY
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", stopResize)
      })
    }
    makeResizable(".resizable")
  }, [])

  return (
    <div className="resizable relative [&_.resizer]:opacity-0 [&_.resizer]:hover:opacity-100">
      {bulletsNode}
      {children}
    </div>
  )
}

export default ResizableWrapper
