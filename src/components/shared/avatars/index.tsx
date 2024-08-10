import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";

type Props = {
  items: { title: string; src: string }[];
};
export default function Avatars({ items }: Props) {
  return (
    <div className='flex flex-row gap-1 items-center flex-wrap'>
      {items.map((item, key) => (
        <CotopiaTooltip title={item.title} key={key}>
          <CotopiaAvatar
            className='w-8 h-8'
            src={item.src}
            title={item.title}
          />
        </CotopiaTooltip>
      ))}
    </div>
  );
}
