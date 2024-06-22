import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { User } from "lucide-react";

export default function UserSettingsButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <User />
    </CotopiaIconButton>
  );
}
