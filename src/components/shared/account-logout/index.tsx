import CotopiaButton from "@/components/shared-ui/c-button";
import { logoutSession } from "@/store/redux/slices/auth-slice";
import { useAppDispatch } from "@/store/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

export default function AccountLogout() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const handleLogout = () => {
    dispatch(logoutSession());
    router.push(`/api/auth/sign-out`);
  };

  return (
    <CotopiaButton
      onClick={handleLogout}
      variant={"destructive"}
      className='text-white !px-4'
    >
      Logout
    </CotopiaButton>
  );
}
