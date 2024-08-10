import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import useKeyPress from "@/hooks/use-key-press";
import { X } from "lucide-react";
import React from "react";

type Props = {
  onClick: () => void;
};
export default function CloseSidebar({ onClick }: Props) {
  useKeyPress("Escape", onClick);

  return (
    <CotopiaIconButton className='text-black' onClick={onClick}>
      <X size={20} />
    </CotopiaIconButton>
  );
}
