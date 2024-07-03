import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function UserLogoutButtonTool() {
  return (
    <Link href={`/workspaces/all`} title='Back to workspaces'>
      <CotopiaIconButton className='text-red-600'>
        <LogOut />
      </CotopiaIconButton>
    </Link>
  );
}
