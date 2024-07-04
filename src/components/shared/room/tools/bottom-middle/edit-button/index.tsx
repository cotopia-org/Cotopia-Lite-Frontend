import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Pencil } from "lucide-react";

interface Props {
  onClick?: () => void
}

export default function EditButtonTool(props : Props) {
  return (
    <CotopiaIconButton className='text-black'>
      <Pencil size={20} onClick={props.onClick}/>
    </CotopiaIconButton>
  );
}
