import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";

export default function UserAvatarButtonTool() {
  return (
    <CotopiaIconButton>
      <CotopiaAvatar title='M' className='w-8 h-8 text-black' />
    </CotopiaIconButton>
  );
}
