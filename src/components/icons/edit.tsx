import { IconProps, defaultColor } from "."

const Edit = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.83958 2.9L3.36624 8.69333C3.15958 8.91333 2.95958 9.34667 2.91958 9.64667L2.67291 11.8067C2.58624 12.5867 3.14624 13.12 3.91958 12.9867L6.06624 12.62C6.36624 12.5667 6.78624 12.3467 6.99291 12.12L12.4662 6.32667C13.4129 5.32667 13.8396 4.18667 12.3662 2.79334C10.8996 1.41334 9.78624 1.9 8.83958 2.9Z"
        stroke={color}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.92676 3.86664C8.21342 5.70664 9.70676 7.1133 11.5601 7.29997"
        stroke={color}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 15.1667H14"
        stroke={color}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Edit
