import { IconProps, defaultColor } from "."

const TickCircle = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 15.1666C11.6663 15.1666 14.6663 12.1666 14.6663 8.49998C14.6663 4.83331 11.6663 1.83331 7.99967 1.83331C4.33301 1.83331 1.33301 4.83331 1.33301 8.49998C1.33301 12.1666 4.33301 15.1666 7.99967 15.1666Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.16699 8.50001L7.05366 10.3867L10.8337 6.61334"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default TickCircle
