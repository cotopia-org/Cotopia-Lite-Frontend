import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { ArrowLeft } from "lucide-react";

type Props = {
  onClick: () => void;
};
export default function BackHolder({ onClick }: Props) {
  return (
    <div>
      <CotopiaIconButton className='text-black/60' onClick={onClick}>
        <ArrowLeft />
      </CotopiaIconButton>
    </div>
  );
}
