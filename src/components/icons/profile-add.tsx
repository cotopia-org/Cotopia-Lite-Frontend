import { IconProps, defaultColor } from "."

const ProfileAdd = ({ color = defaultColor, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4163 16.25H12.083"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.75 17.9166V14.5833"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.1332 9.05841C10.0498 9.05008 9.94984 9.05008 9.85817 9.05841C7.87484 8.99175 6.29984 7.36675 6.29984 5.36675C6.2915 3.32508 7.94984 1.66675 9.9915 1.66675C12.0332 1.66675 13.6915 3.32508 13.6915 5.36675C13.6915 7.36675 12.1082 8.99175 10.1332 9.05841Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.99121 18.1751C8.47454 18.1751 6.96621 17.7917 5.81621 17.0251C3.79954 15.6751 3.79954 13.4751 5.81621 12.1334C8.10788 10.6001 11.8662 10.6001 14.1579 12.1334"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default ProfileAdd
