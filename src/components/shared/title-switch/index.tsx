import { Switch } from "@/components/ui/switch";
import { PrimitiveButtonProps } from "@radix-ui/react-dialog";

type Props = PrimitiveButtonProps & {
  title: string;
};
export default function TitleSwitch({ title, ...rest }: Props) {
  return (
    <div className='flex flex-row items-center justify-between'>
      <strong>{title}</strong>
      <Switch {...rest} />
    </div>
  );
}
