import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Settings } from "lucide-react";

export default function UserSettingsButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <Settings />
    </CotopiaIconButton>
  );
}
