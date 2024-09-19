import { Switch } from "@/components/ui/switch";
import { SwitchProps } from "@radix-ui/react-switch";

type Props = SwitchProps & {
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
