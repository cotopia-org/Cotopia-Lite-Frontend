import { IconProps, defaultColor } from "."

const Grid = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3333 7.10008V3.31675C18.3333 2.14175 17.8 1.66675 16.475 1.66675H13.1083C11.7833 1.66675 11.25 2.14175 11.25 3.31675V7.09175C11.25 8.27508 11.7833 8.74175 13.1083 8.74175H16.475C17.8 8.75008 18.3333 8.27508 18.3333 7.10008Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3333 16.475V13.1083C18.3333 11.7833 17.8 11.25 16.475 11.25H13.1083C11.7833 11.25 11.25 11.7833 11.25 13.1083V16.475C11.25 17.8 11.7833 18.3333 13.1083 18.3333H16.475C17.8 18.3333 18.3333 17.8 18.3333 16.475Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.75033 7.10008V3.31675C8.75033 2.14175 8.21699 1.66675 6.89199 1.66675H3.52533C2.20033 1.66675 1.66699 2.14175 1.66699 3.31675V7.09175C1.66699 8.27508 2.20033 8.74175 3.52533 8.74175H6.89199C8.21699 8.75008 8.75033 8.27508 8.75033 7.10008Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.75033 16.475V13.1083C8.75033 11.7833 8.21699 11.25 6.89199 11.25H3.52533C2.20033 11.25 1.66699 11.7833 1.66699 13.1083V16.475C1.66699 17.8 2.20033 18.3333 3.52533 18.3333H6.89199C8.21699 18.3333 8.75033 17.8 8.75033 16.475Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Grid
