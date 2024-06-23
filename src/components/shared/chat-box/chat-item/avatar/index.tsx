import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { UserType } from "@/types/user";
type Props = {
  title: string;
};

export default function Avatar({ title }: Props) {
  return <CotopiaAvatar title={title} />;
}
