import { IconProps, defaultColor } from "."

const Logout = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5332 12.1834L16.6665 10.0501L14.5332 7.91675"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.13379 10.05H16.6088"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.80046 16.6666C6.11712 16.6666 3.13379 14.1666 3.13379 9.99992C3.13379 5.83325 6.11712 3.33325 9.80046 3.33325"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Logout
