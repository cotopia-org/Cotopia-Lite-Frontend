import { IconProps, defaultColor } from "."

const ClockIcon = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3337 10.0001C18.3337 14.6001 14.6003 18.3334 10.0003 18.3334C5.40033 18.3334 1.66699 14.6001 1.66699 10.0001C1.66699 5.40008 5.40033 1.66675 10.0003 1.66675C14.6003 1.66675 18.3337 5.40008 18.3337 10.0001Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.0914 12.65L10.5081 11.1083C10.0581 10.8416 9.69141 10.2 9.69141 9.67497V6.2583"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default ClockIcon
