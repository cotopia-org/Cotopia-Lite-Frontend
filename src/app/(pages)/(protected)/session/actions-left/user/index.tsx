import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { User } from "lucide-react";

export default function UserButton() {
  return (
    <CotopiaIconButton className='w-8 h-8 text-black/60'>
      <User size={22} />
    </CotopiaIconButton>
  );
}
