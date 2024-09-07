import CotopiaAvatar from "../shared-ui/c-avatar";
import CotopiaTooltip from "../shared-ui/c-tooltip";

type Props = {
  title: string;
  toolTipTitle?: string;
  src?: string;
};
export default function UserAvatar({ title, toolTipTitle, src }: Props) {
  return (
    <CotopiaTooltip title={toolTipTitle ? toolTipTitle : title}>
      <CotopiaAvatar
        className='w-8 h-8'
        src={src}
        title={title ? title?.[0] : undefined}
      />
    </CotopiaTooltip>
  );
}
