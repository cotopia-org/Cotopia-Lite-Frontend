import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Grid2X2 } from "lucide-react";

export default function GridViewButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <Grid2X2 size={20} />
    </CotopiaIconButton>
  );
}
