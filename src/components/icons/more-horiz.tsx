import { IconProps, defaultColor } from "."

const MoreHorizontal = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33333 6.66675C2.6 6.66675 2 7.26675 2 8.00008C2 8.73341 2.6 9.33341 3.33333 9.33341C4.06667 9.33341 4.66667 8.73341 4.66667 8.00008C4.66667 7.26675 4.06667 6.66675 3.33333 6.66675Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M12.6663 6.66675C11.933 6.66675 11.333 7.26675 11.333 8.00008C11.333 8.73341 11.933 9.33341 12.6663 9.33341C13.3997 9.33341 13.9997 8.73341 13.9997 8.00008C13.9997 7.26675 13.3997 6.66675 12.6663 6.66675Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M8.00033 6.66675C7.26699 6.66675 6.66699 7.26675 6.66699 8.00008C6.66699 8.73341 7.26699 9.33341 8.00033 9.33341C8.73366 9.33341 9.33366 8.73341 9.33366 8.00008C9.33366 7.26675 8.73366 6.66675 8.00033 6.66675Z"
        stroke={color}
        stroke-width="1.5"
      />
    </svg>
  )
}

export default MoreHorizontal
