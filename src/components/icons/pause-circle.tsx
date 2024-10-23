import { IconProps, defaultColor } from "."

const PauseCircle = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66634 10.5V6.49998M9.33301 10.5V6.49998M14.6663 8.49998C14.6663 12.1819 11.6816 15.1666 7.99967 15.1666C4.31778 15.1666 1.33301 12.1819 1.33301 8.49998C1.33301 4.81808 4.31778 1.83331 7.99967 1.83331C11.6816 1.83331 14.6663 4.81808 14.6663 8.49998Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default PauseCircle
