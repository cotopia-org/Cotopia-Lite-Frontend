import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Video } from "lucide-react";

export default function VideoButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <Video size={20} />
    </CotopiaIconButton>
  );
}
