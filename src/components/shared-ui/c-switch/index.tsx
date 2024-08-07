import { v4 as uuidv4 } from "uuid";

import { Switch } from "@/components/ui/switch";
import { SwitchProps } from "@radix-ui/react-switch";

type Props = SwitchProps & { label?: string };

export default function CotopiaSwitch({ label, ...rest }: Props) {
  const switchId = rest?.id ?? uuidv4();

  return (
    <div className='flex flex-row items-center gap-x-4'>
      <Switch id={switchId} {...rest} />
      <label className='cursor-pointer text-sm' htmlFor={switchId}>
        {label}
      </label>
    </div>
  );
}
