import { Switch } from "@/components/ui/switch";

type PrimitiveButtonProps = any;

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
