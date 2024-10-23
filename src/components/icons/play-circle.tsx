import { IconProps, defaultColor } from "."

const PlayCircle = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.98014 15.1666C11.662 15.1666 14.6468 12.1819 14.6468 8.49998C14.6468 4.81808 11.662 1.83331 7.98014 1.83331C4.29824 1.83331 1.31348 4.81808 1.31348 8.49998C1.31348 12.1819 4.29824 15.1666 7.98014 15.1666Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.82715 8.65331V7.53998C5.82715 6.15331 6.80715 5.58665 8.00715 6.27998L8.97382 6.83998L9.94048 7.39998C11.1405 8.09331 11.1405 9.22665 9.94048 9.91998L8.97382 10.48L8.00715 11.04C6.80715 11.7333 5.82715 11.1666 5.82715 9.77998V8.65331Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default PlayCircle
