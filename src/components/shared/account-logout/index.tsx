import CotopiaButton from "@/components/shared-ui/c-button";
import { useRouter } from "next/navigation";
import React from "react";

export default function AccountLogout() {
  const router = useRouter();
  const handleLogout = () => {
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
