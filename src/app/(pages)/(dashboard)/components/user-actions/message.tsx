import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessageCircle } from "lucide-react";

export default function UserActionsMessageButton() {
  return (
    <CotopiaIconButton variant={"outline"}>
      <MessageCircle />
    </CotopiaIconButton>
  );
}
