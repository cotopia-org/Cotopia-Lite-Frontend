import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessageCircleQuestion } from "lucide-react";

export default function QuestionButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <MessageCircleQuestion />
    </CotopiaIconButton>
  );
}
