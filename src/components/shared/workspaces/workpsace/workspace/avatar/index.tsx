import CotopiaAvatar from "@/components/shared-ui/c-avatar";

type Props = {
  title: string;
};
export default function WorkspaceAvatar({ title }: Props) {
  return <CotopiaAvatar src='' title={title} className='w-[44px] h-[44px]' />;
}
