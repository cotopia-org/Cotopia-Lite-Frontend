import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaPopover from "@/components/shared-ui/c-popover";
import { Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

type Props = {
  onPick: (emoji: string) => void;
};

export default function EmojiHandlerButton({ onPick }: Props) {
  return (
    <CotopiaPopover
      align='end'
      trigger={
        <CotopiaIconButton type='button' className='text-black/60'>
          <Smile />
        </CotopiaIconButton>
      }
      contentClassName='!p-0 !border-0'
    >
      <EmojiPicker onEmojiClick={(emoji) => onPick(emoji.emoji)} />
    </CotopiaPopover>
  );
}
