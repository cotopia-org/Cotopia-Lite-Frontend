import { ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
}

const ResizableWrapper = ({ children }: Props) => {
  let bulletClss =
    "w-[10px] h-[10px] bg-white rounded-full absolute border-red-500 border-2"

  let bulletsNode = (
    <>
      <div
        className={`resizer cursor-nwse-resize top-left left-[-5px] top-[-5px] ${bulletClss}`}
      ></div>
      <div
        className={`resizer cursor-nesw-resize top-right top-[-5px] right-[-5px] ${bulletClss}`}
      ></div>
      <div
        className={`resizer cursor-nesw-resize left-[-5px] bottom-[-5px] bottom-left ${bulletClss}`}
      ></div>
      <div
        className={`resizer cursor-nwse-resize right-[-5px] bottom-[-5px] bottom-right ${bulletClss}`}
      ></div>
    </>
  )

  useEffect(() => {
    const makeResizable = (selector: string) => {
      const element = document.querySelector(selector) as HTMLElement
      if (element === null) return
      const resizers = document.querySelectorAll(selector + " .resizer")
      const minimum_size = 20
      let original_width = 0
      let original_height = 0
      let original_x = 0
      let original_y = 0
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
          } else if (currentResizer.classList.contains("bottom-left")) {
            const height = original_height + (e.pageY - original_mouse_y)
            const width = original_width - (e.pageX - original_mouse_x)
            if (height > minimum_size) {
              element.style.height = height + "px"
            }
            if (width > minimum_size) {
              element.style.width = width + "px"
              element.style.left =
                original_x + (e.pageX - original_mouse_x) + "px"
            }
          } else if (currentResizer.classList.contains("top-right")) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + "px"
            }
            if (height > minimum_size) {
              element.style.height = height + "px"
              element.style.top =
                original_y + (e.pageY - original_mouse_y) + "px !important"
            }
          } else {
            const width = original_width - (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + "px"
              element.style.left =
                original_x + (e.pageX - original_mouse_x) + "px"
            }
            if (height > minimum_size) {
              element.style.height = height + "px"
              element.style.top =
                original_y + (e.pageY - original_mouse_y) + "px"
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
          original_x = element.getBoundingClientRect().left
          original_y = element.getBoundingClientRect().top
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
    <div className="relative">
      <div
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="resizable"
      >
        <div className="resizers bg-white w-full h-full box-content">
          {bulletsNode}
          {children}
        </div>
      </div>
    </div>
  )
}

export default ResizableWrapper
// function makeResizableDiv(div) {
//     const element = document.querySelector(div);
//     const resizers = document.querySelectorAll(div + ' .resizer')
//     const minimum_size = 20;
//     let original_width = 0;
//     let original_height = 0;
//     let original_x = 0;
//     let original_y = 0;
//     let original_mouse_x = 0;
//     let original_mouse_y = 0;
//     for (let i = 0;i < resizers.length; i++) {
//       const currentResizer = resizers[i];
//       currentResizer.addEventListener('mousedown', function(e) {
//         e.preventDefault()
//         original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
//         original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
//         original_x = element.getBoundingClientRect().left;
//         original_y = element.getBoundingClientRect().top;
//         original_mouse_x = e.pageX;
//         original_mouse_y = e.pageY;
//         window.addEventListener('mousemove', resize)
//         window.addEventListener('mouseup', stopResize)
//       })

//       function resize(e) {
//         if (currentResizer.classList.contains('bottom-right')) {
//           const width = original_width + (e.pageX - original_mouse_x);
//           const height = original_height + (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//           }
//         }
//         else if (currentResizer.classList.contains('bottom-left')) {
//           const height = original_height + (e.pageY - original_mouse_y)
//           const width = original_width - (e.pageX - original_mouse_x)
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//           }
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//             element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
//           }
//         }
//         else if (currentResizer.classList.contains('top-right')) {
//           const width = original_width + (e.pageX - original_mouse_x)
//           const height = original_height - (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//             element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
//           }
//         }
//         else {
//           const width = original_width - (e.pageX - original_mouse_x)
//           const height = original_height - (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//             element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//             element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
//           }
//         }
//       }

//       function stopResize() {
//         window.removeEventListener('mousemove', resize)
//       }
//     }
//   }
