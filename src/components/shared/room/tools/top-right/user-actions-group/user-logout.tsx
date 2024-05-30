import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { LogOut } from "lucide-react";

export default function UserLogoutButtonTool() {
  return (
    <CotopiaIconButton className='text-red-600'>
      <LogOut />
    </CotopiaIconButton>
  );
}
