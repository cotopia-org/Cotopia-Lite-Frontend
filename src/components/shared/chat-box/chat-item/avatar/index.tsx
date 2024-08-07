import CotopiaAvatar from "@/components/shared-ui/c-avatar";

type Props = {
  title: string;
  src?: string;
};

export default function Avatar({ title, src }: Props) {
  return <CotopiaAvatar src={src} title={title} />;
}
