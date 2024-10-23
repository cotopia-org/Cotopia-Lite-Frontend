import { IconProps, defaultColor } from "."

const Briefcase = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66636 18.3333H13.333C16.683 18.3333 17.283 16.9917 17.458 15.3583L18.083 8.69167C18.308 6.65833 17.7247 5 14.1664 5H5.83303C2.27469 5 1.69136 6.65833 1.91636 8.69167L2.54136 15.3583C2.71636 16.9917 3.31636 18.3333 6.66636 18.3333Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66699 5.00008V4.33341C6.66699 2.85841 6.66699 1.66675 9.33366 1.66675H10.667C13.3337 1.66675 13.3337 2.85841 13.3337 4.33341V5.00008"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6663 10.8333V11.6667C11.6663 11.675 11.6663 11.675 11.6663 11.6833C11.6663 12.5917 11.658 13.3333 9.99967 13.3333C8.34967 13.3333 8.33301 12.6 8.33301 11.6917V10.8333C8.33301 10 8.33301 10 9.16634 10H10.833C11.6663 10 11.6663 10 11.6663 10.8333Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.042 9.16675C16.117 10.5667 13.917 11.4001 11.667 11.6834"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.18359 9.3916C4.05859 10.6749 6.17526 11.4499 8.33359 11.6916"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Briefcase
